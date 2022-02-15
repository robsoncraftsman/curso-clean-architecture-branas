import ItemPedido from '../entity/ItemPedido';
import CalculadoraImpostosPadraoService from './CalculadoraImpostosPadraoService';

export default class CalculadoraImpostosEspecialService extends CalculadoraImpostosPadraoService {
  async getTaxaImposto(itemPedido: ItemPedido): Promise<number> {
    const valorImposto = await super.getTaxaImposto(itemPedido);
    return valorImposto * 0.5;
  }
}
