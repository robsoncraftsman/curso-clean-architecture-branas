import ItemPedido from '../entity/ItemPedido';
import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosService from './CalculadoraImpostosService';

export default class CalculadoraImpostosPadraoService extends CalculadoraImpostosService {
  constructor(private _impostoProdutoRepository: ImpostoProdutoRepository) {
    super();
  }

  async getTaxaImposto(itemPedido: ItemPedido): Promise<number> {
    return await this._impostoProdutoRepository.findValorImposto(itemPedido.produto);
  }
}
