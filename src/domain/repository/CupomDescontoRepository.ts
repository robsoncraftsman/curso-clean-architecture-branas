import CupomDesconto from '../entity/CupomDesconto';

export default interface CupomDescontoRepository {
  findByCodigo(codigo: string): Promise<CupomDesconto | undefined>;
}
