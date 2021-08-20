import CupomDesconto from '../entity/CupomDesconto';

export default interface CupomDescontoRepository {
  findCupomByCodigo(codigo: string): CupomDesconto;
}
