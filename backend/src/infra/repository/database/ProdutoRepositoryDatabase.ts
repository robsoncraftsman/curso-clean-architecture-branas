import Produto from '../../../domain/entity/Produto';
import ProdutoRepository from '../../../domain/repository/ProdutoRepository';
import Database from '../../database/Database';

export default class ProdutoRepositorydatabase implements ProdutoRepository {
  constructor(private database: Database) {}

  async findById(id_produto: string): Promise<Produto | undefined> {
    const produtoDb = await this.database.findOne('select * from ccca.produto where id = $1', [id_produto]);
    if (!produtoDb) return;
    const produto = new Produto(
      produtoDb.id,
      produtoDb.nome,
      produtoDb.peso,
      produtoDb.altura,
      produtoDb.largura,
      produtoDb.profundidade,
      produtoDb.valor
    );
    return produto;
  }
}
