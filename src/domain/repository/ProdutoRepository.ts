import Produto from '../entity/Produto';

export default interface ProdutoRepository {
  findById(id: string): Promise<Produto | undefined>;
}
