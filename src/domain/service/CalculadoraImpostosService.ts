import ItemPedido from '../entity/ItemPedido';

export default abstract class CalculadoraImpostosService {
  async calcularImposto(itemPedido: ItemPedido): Promise<number> {
    const taxaImposto = await this.getTaxaImposto(itemPedido);
    return (itemPedido.valorTotal * taxaImposto) / 100;
  }

  abstract getTaxaImposto(itemPedido: ItemPedido): Promise<number>;
}
