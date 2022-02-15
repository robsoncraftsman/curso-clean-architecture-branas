import Cpf from './Cpf';
import CupomDesconto from './CupomDesconto';
import ItemPedido from './ItemPedido';
import Produto from './Produto';

export default class Pedido {
  private _id: string;
  private _cpf: Cpf;
  private _cepDestino: string;
  private _valorFrete: number = 0;
  private _itens: ItemPedido[] = [];
  private _cupomDesconto?: CupomDesconto;

  constructor(id: string, cpf: string, cepDestino: string) {
    this._id = id;
    this._cpf = new Cpf(cpf);
    this._cepDestino = cepDestino;
  }

  get id() {
    return this._id;
  }

  get cpf() {
    return this._cpf.cpf;
  }

  get cepDestino() {
    return this._cepDestino;
  }

  get cupomDesconto() {
    if (this._cupomDesconto) {
      return this._cupomDesconto.codigo;
    }
    return null;
  }

  get itens() {
    return this._itens;
  }

  addItem(produto: Produto, valor: number, quantidade: number) {
    const itemPedido = new ItemPedido(produto, valor, quantidade);
    this._itens.push(itemPedido);
  }

  private calcularDesconto(valorTotal: number) {
    if (!this._cupomDesconto) {
      return valorTotal;
    }
    return valorTotal * (1 - this._cupomDesconto.valorDesconto / 100);
  }

  getValorItens() {
    return this._itens.reduce((totalPedido: number, item: ItemPedido) => totalPedido + item.valorTotal, 0);
  }

  getValorItensComDesconto() {
    const totalItens = this.getValorItens();
    return this.calcularDesconto(totalItens);
  }

  setValorFrete(valorFrete: number) {
    this._valorFrete = valorFrete;
  }

  getValorFrete() {
    return this._valorFrete;
  }

  addCupomDesconto(cupomDesconto: CupomDesconto) {
    if (cupomDesconto.isExpirado()) {
      throw Error(`Cupom de desconto expirado: ${cupomDesconto.codigo}`);
    }
    this._cupomDesconto = cupomDesconto;
  }
}
