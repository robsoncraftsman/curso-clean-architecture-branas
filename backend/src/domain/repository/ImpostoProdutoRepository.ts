import Produto from '../entity/Produto';

export default interface ImpostoProdutoRepository {
  findValorImposto(produto: Produto): Promise<number>;
}
