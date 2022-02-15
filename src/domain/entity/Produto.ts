export default class Produto {
  private UM_METRO_CUBICO = 1000000;

  constructor(
    private _id: string,
    private _nome: string,
    private _peso: number = 0,
    private _altura: number = 0,
    private _largura: number = 0,
    private _profundidade: number = 0,
    private _valor: number = 0
  ) {}

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get peso() {
    return this._peso;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return (this._altura * this._largura * this._profundidade) / this.UM_METRO_CUBICO;
  }

  get densidade() {
    return this.peso / this.volume;
  }
}
