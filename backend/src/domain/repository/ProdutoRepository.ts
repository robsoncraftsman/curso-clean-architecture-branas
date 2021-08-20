import Produto from '../entity/Produto';

export default interface ProdutoRepository {
  findProdutoById(id: string): Produto;
}
