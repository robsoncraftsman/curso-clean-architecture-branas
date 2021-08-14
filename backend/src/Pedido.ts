import Cpf from './Cpf';
import CupomDesconto from './CupomDesconto';
import ItemPedido from './ItemPedido';
import Produto from './Produto';

export default class Pedido {
  private _cupomDesconto?: CupomDesconto;
  private _cpf: Cpf;
  private _itens: ItemPedido[] = [];

  constructor(cpf: string) {
    this._cpf = new Cpf(cpf);
  }

  get cpf() {
    return this._cpf;
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

  addCupomDesconto(cupomDesconto: CupomDesconto) {
    if (cupomDesconto.isExpirado()) {
      throw Error(`Cupom de desconto expirado: ${cupomDesconto.codigo}`);
    }
    this._cupomDesconto = cupomDesconto;
  }
}
