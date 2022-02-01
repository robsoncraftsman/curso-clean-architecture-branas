import CupomDesconto from '../../../domain/entity/CupomDesconto';
import CupomDescontoRepository from '../../../domain/repository/CupomDescontoRepository';
import Database from '../../database/Database';

export default class CupomDescontoRepositoryDatabase implements CupomDescontoRepository {
  constructor(private database: Database) {}

  async findByCodigo(codigo: string): Promise<CupomDesconto | undefined> {
    const cupomDb = await this.database.findOne('select * from ccca.cupomDesconto where codigo = $1', [codigo]);
    if (!cupomDb) return;
    console.log(cupomDb.datavalidade);
    const cupomDesconto = new CupomDesconto(cupomDb.codigo, parseInt(cupomDb.valordesconto), cupomDb.datavalidade);
    return cupomDesconto;
  }
}
