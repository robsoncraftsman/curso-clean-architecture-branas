import CupomDesconto from './CupomDesconto';

export default interface CupomDescontoRepository {
  findCupomByCodigo(codigo: string): CupomDesconto;
}
