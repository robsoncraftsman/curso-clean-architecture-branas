import Produto from './Produto';

export default class ItemPedido {
  constructor(private _produto: Produto, private _valorUnitario: number, private _quantidade: number) {}

  get produto() {
    return this._produto;
  }

  get valorUnitario() {
    return this._valorUnitario;
  }

  get quantidade() {
    return this._quantidade;
  }

  get valorTotal() {
    return this._valorUnitario * this._quantidade;
  }
}
