import Produto from './Produto';

export default class ImpostoProduto {
  constructor(public produto: Produto, public valor: number) {}
}
