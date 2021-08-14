import CalculadoraDistanciaEntreCeps from './CalculadoraDistanciaEntreCeps';
import CalcularFreteService from './CalcularFreteService';
import CupomDescontoRepository from './CupomDescontoRepository';
import Pedido from './Pedido';
import ProdutoRepository from './ProdutoRepository';

export type CadastrarItemPedidoInput = {
  id_produto: string;
  quantidade: number;
  valor: number;
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
    private _calcularFreteService: CalcularFreteService,
    private _calculadoraDistanciaEntreCeps: CalculadoraDistanciaEntreCeps
  ) {}

  execute(input: CadastrarPedidoInput): CadastrarPedidoOutput {
    const pedido = new Pedido(input.cpf);
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
    const distancia = this._calculadoraDistanciaEntreCeps.calcularDistanciaEntreCeps(
      '11.111.111-111',
      input.cepDestino
    );
    let valorFrete = pedido.itens.reduce(
      (valorFrete, itemPedido) =>
        valorFrete +
        this._calcularFreteService.calcularFreteProduto(itemPedido.produto, distancia) * itemPedido.quantidade,
      0
    );
    return {
      valorItens: pedido.getValorItens(),
      valorItensComDesconto: pedido.getValorItensComDesconto(),
      valorFrete
    };
  }
}
