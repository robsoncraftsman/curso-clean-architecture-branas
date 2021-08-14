import DimensaoProduto from './DimensaoProduto';

export default class Produto {
  constructor(
    private _nome: string,
    private _peso: number = 0,
    private _dimensao: DimensaoProduto = new DimensaoProduto(0, 0, 0)
  ) {}

  get nome() {
    return this._nome;
  }

  get peso() {
    return this._peso;
  }

  get dimensao() {
    return this._dimensao;
  }

  get volume() {
    return this._dimensao.volume;
  }

  get densidade() {
    return this.peso / this.volume;
  }
}
