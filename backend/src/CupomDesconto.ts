export default class CupomDesconto {
  constructor(private _codigo: string, private _valorDesconto: number, private _dataValidade: Date) {}

  get codigo() {
    return this._codigo;
  }

  get valorDesconto() {
    return this._valorDesconto;
  }

  isExpirado() {
    const dataAtual = new Date();
    return this._dataValidade < dataAtual;
  }
}
