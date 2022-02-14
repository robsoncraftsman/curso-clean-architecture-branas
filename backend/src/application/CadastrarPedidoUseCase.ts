import ItemPedido from '../domain/entity/ItemPedido';
import Pedido from '../domain/entity/Pedido';
import CalculadoraImpostosFactory from '../domain/factory/CalculadoraImpostosFactory';
import CupomDescontoRepository from '../domain/repository/CupomDescontoRepository';
import ImpostoProdutoRepository from '../domain/repository/ImpostoProdutoRepository';
import PedidoRepository from '../domain/repository/PedidoRepository';
import ProdutoRepository from '../domain/repository/ProdutoRepository';
import CalculadoraFretePedidoService from '../domain/service/CalculadoraFretePedidoService';
import PedidoService from '../domain/service/PedidoService';

export type CadastrarItemPedidoInput = {
  id_produto: string;
  valor: number;
  quantidade: number;
};

export type CadastrarPedidoInput = {
  data: Date;
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
    private _impostoProdutoRepository: ImpostoProdutoRepository
  ) {}

  async execute(input: CadastrarPedidoInput): Promise<CadastrarPedidoOutput> {
    const numeroPedido = this._pedidoService.gerarNumeroPedido();
    const pedido = new Pedido(numeroPedido, input.cpf, input.cepDestino);
    for (const item of input.itens) {
      const produto = await this._produtoRepository.findById(item.id_produto);
      if (!produto) throw Error(`Produto ${item.id_produto} não encontrado`);
      pedido.addItem(produto, item.valor, item.quantidade);
    }
    if (input.cupomDesconto) {
      const cupomDesconto = await this._cupomDescontoRepository.findByCodigo(input.cupomDesconto);
      if (cupomDesconto) {
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    const valorFrete = this._calculadoraFretePedidoService.calcularFretePedido(pedido);
    pedido.setValorFrete(valorFrete);
    const calculadoraImpostos = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      input.data,
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
