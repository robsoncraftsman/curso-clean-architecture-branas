import Produto from './Produto';

export default interface ProdutoRepository {
  findProdutoById(id: string): Produto;
}
