import Pedido from '../domain/entity/Pedido';
import CupomDescontoRepository from '../domain/repository/CupomDescontoRepository';
import ProdutoRepository from '../domain/repository/ProdutoRepository';
import CalculadoraFretePedidoService from '../domain/service/CalculadoraFretePedidoService';

export type CadastrarItemPedidoInput = {
  id_produto: string;
  valor: number;
  quantidade: number;
};

export type CadastrarPedidoInput = {
  cpf: string;
  itens: CadastrarItemPedidoInput[];
  cupomDesconto?: string;
  cepDestino: string;
};

export type CadastrarPedidoOutput = {
  valorItens: number;
  valorItensComDesconto: number;
  valorFrete: number;
};

export default class CadastrarPedidoUseCase {
  constructor(
    private _cupomDescontoRepository: CupomDescontoRepository,
    private _produtoRepository: ProdutoRepository,
    private _calculadoraFretePedidoService: CalculadoraFretePedidoService
  ) {}

  execute(input: CadastrarPedidoInput): CadastrarPedidoOutput {
    const pedido = new Pedido('1', input.cpf, input.cepDestino);
    for (const item of input.itens) {
      const produto = this._produtoRepository.findProdutoById(item.id_produto);
      pedido.addItem(produto, item.valor, item.quantidade);
    }
    if (input.cupomDesconto) {
      const cupomDesconto = this._cupomDescontoRepository.findCupomByCodigo(input.cupomDesconto);
      if (cupomDesconto) {
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    const valorFrete = this._calculadoraFretePedidoService.calcularFretePedido(pedido);
    pedido.setValorFrete(valorFrete);
    return {
      valorItens: pedido.getValorItens(),
      valorItensComDesconto: pedido.getValorItensComDesconto(),
      valorFrete: pedido.getValorFrete()
    };
  }
}