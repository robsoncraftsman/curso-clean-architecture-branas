import CalculadoraDistanciaEntreCeps from './CalculadoraDistanciaEntreCeps';
import CalculadoraFreteProdutoService from './CalculadoraFreteProdutoService';
import Pedido from './Pedido';

export default class CalculadoraFretePedidoService {
  constructor(
    private _calculadoraDistanciaEntreCeps: CalculadoraDistanciaEntreCeps,
    private _calculadoraFreteProdutoService: CalculadoraFreteProdutoService
  ) {}

  calcularFretePedido(pedido: Pedido) {
    const distancia = this._calculadoraDistanciaEntreCeps.calcularDistanciaEntreCeps(
      '11.111.111-111',
      pedido.cepDestino
    );
    const valorFrete = pedido.itens.reduce(
      (valorFrete, itemPedido) =>
        valorFrete +
        this._calculadoraFreteProdutoService.calcularFreteProduto(itemPedido.produto, distancia) *
          itemPedido.quantidade,
      0
    );
    return valorFrete;
  }
}
