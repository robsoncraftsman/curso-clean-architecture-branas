export default class CupomDesconto {
  constructor(private _codigo: string, private _valorDesconto: number) {}

  get codigo() {
    return this._codigo;
  }

  get valorDesconto() {
    return this._valorDesconto;
  }
}
