export default class DimensaoProduto {
  UM_METRO_CUBICO = 1000000;

  constructor(private _altura: number, private _largura: number, private _profundidade: number) {}

  get volume() {
    return (this._altura * this._largura * this._profundidade) / this.UM_METRO_CUBICO;
  }
}
