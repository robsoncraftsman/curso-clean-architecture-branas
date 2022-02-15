import ImpostoProduto from '../../../domain/entity/ImpostoProduto';
import Produto from '../../../domain/entity/Produto';
import ImpostoProdutoRepository from '../../../domain/repository/ImpostoProdutoRepository';

export default class ImpostoProdutoRepositoryMemory implements ImpostoProdutoRepository {
  impostoPodutos = [
    new ImpostoProduto(new Produto('1', 'Câmera', 1, 20, 15, 10, 1), 20),
    new ImpostoProduto(new Produto('2', 'Guitarra', 3, 100, 30, 10, 1), 10),
    new ImpostoProduto(new Produto('3', 'Geladeira', 40, 200, 100, 50, 1), 5)
  ];

  async findValorImposto(produto: Produto): Promise<number> {
    const impostoProduto = this.impostoPodutos.find((impostoProduto) => impostoProduto.produto.id === produto.id);
    if (impostoProduto) {
      return Promise.resolve(impostoProduto.valor);
    } else {
      return Promise.resolve(0);
    }
  }
}
