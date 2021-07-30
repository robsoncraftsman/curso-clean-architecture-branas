export default class ItemPedido {
  constructor(private _produto: string, private _valorUnitario: number, private _quantidade: number) {}

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
    return this.valorUnitario * this.quantidade;
  }
}
