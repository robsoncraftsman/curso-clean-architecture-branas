export default class CupomDesconto {
  constructor(private _codigo: string, private _valorDesconto: number, private _dataValidade: Date) {}

  get codigo() {
    return this._codigo;
  }

  get valorDesconto() {
    return this._valorDesconto;
  }

  get dataValidade() {
    return this._dataValidade;
  }

  private removerHoras(date: Date) {
    var date = new Date(date.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

  isExpirado() {
    const dataAtualSemHoras = this.removerHoras(new Date());
    const dataValidadeSemHoras = this.removerHoras(this._dataValidade);
    return dataValidadeSemHoras.getTime() < dataAtualSemHoras.getTime();
  }
}
