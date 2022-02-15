import ItemPedido from '../domain/entity/ItemPedido';
import Pedido from '../domain/entity/Pedido';
import CalculadoraImpostosFactory from '../domain/factory/CalculadoraImpostosFactory';
import CupomDescontoRepository from '../domain/repository/CupomDescontoRepository';
import ImpostoProdutoRepository from '../domain/repository/ImpostoProdutoRepository';
import PedidoRepository from '../domain/repository/PedidoRepository';
import ProdutoRepository from '../domain/repository/ProdutoRepository';
import CalculadoraFretePedidoService from '../domain/service/CalculadoraFretePedidoService';
import PedidoService from '../domain/service/PedidoService';
import OperacaoEstoqueRepository from '../domain/repository/OperacaoEstoqueRepository';
import CalculadoraEstoque from '../domain/service/CalculadoraEstoque';
import OperacaoEstoque from '../domain/entity/OperacaoEstoque';

export type CadastrarItemPedidoInput = {
  id_produto: string;
  valor: number;
  quantidade: number;
};

export type CadastrarPedidoInput = {
  dataPedido: Date;
  cpf: string;
  itens: CadastrarItemPedidoInput[];
  cupomDesconto?: string;
  cepDestino: string;
};

export type CadastrarPedidoOutput = {
  valorItens: number;
  valorItensComDesconto: number;
  valorFrete: number;
  valorImpostos: number;
};

export default class CadastrarPedidoUseCase {
  constructor(
    private _cupomDescontoRepository: CupomDescontoRepository,
    private _produtoRepository: ProdutoRepository,
    private _calculadoraFretePedidoService: CalculadoraFretePedidoService,
    private _pedidoService: PedidoService,
    private _pedidoRepository: PedidoRepository,
    private _impostoProdutoRepository: ImpostoProdutoRepository,
    private _operacaoEstoqueRepository: OperacaoEstoqueRepository
  ) {}

  async execute(input: CadastrarPedidoInput): Promise<CadastrarPedidoOutput> {
    const numeroPedido = this._pedidoService.gerarNumeroPedido();
    const pedido = new Pedido(numeroPedido, input.cpf, input.cepDestino);
    for (const item of input.itens) {
      const produto = await this._produtoRepository.findById(item.id_produto);
      if (!produto) throw Error(`Produto ${item.id_produto} não encontrado`);
      const operacoesEstoque = await this._operacaoEstoqueRepository.findOperacoesEstoqueProduto(produto.id);
      const calculadoraEstoque = new CalculadoraEstoque();
      const estoque = calculadoraEstoque.calcularEstoque(operacoesEstoque);
      if (estoque < item.quantidade)
        throw Error(
          `Produto "${produto.id}" não possui estoque suficente. Necessário ${item.quantidade}. Estoque ${estoque}.`
        );
      pedido.addItem(produto, item.valor, item.quantidade);
      await this._operacaoEstoqueRepository.add(new OperacaoEstoque(produto.id, 'OUT', item.quantidade, new Date()));
    }
    if (input.cupomDesconto) {
      const cupomDesconto = await this._cupomDescontoRepository.findByCodigo(input.cupomDesconto);
      if (cupomDesconto) {
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    const valorFrete = this._calculadoraFretePedidoService.calcularFretePedido(pedido);
    pedido.setValorFrete(valorFrete);
    if (typeof input.dataPedido === 'string') {
      input.dataPedido = new Date(input.dataPedido);
    }
    const calculadoraImpostos = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      input.dataPedido,
      this._impostoProdutoRepository
    );
    let valorImpostos = 0;
    for (const itemPedido of pedido.itens) {
      valorImpostos += await calculadoraImpostos.calcularImposto(itemPedido);
    }
    await this._pedidoRepository.save(pedido);
    return {
      valorItens: pedido.getValorItens(),
      valorItensComDesconto: pedido.getValorItensComDesconto(),
      valorFrete: pedido.getValorFrete(),
      valorImpostos
    };
  }
}
