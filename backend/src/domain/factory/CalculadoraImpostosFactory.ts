import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosEspecialService from '../service/CalculadoraImpostosEspecialService';
import CalculadoraImpostosPadraoService from '../service/CalculadoraImpostosPadraoService';

export default class CalculadoraImpostosFactory {
  private constructor() {}

  static createCalculadoraImpostosService(data: Date, impostoProdutoRepository: ImpostoProdutoRepository) {
    if (data.getMonth() === 0) {
      return new CalculadoraImpostosEspecialService(impostoProdutoRepository);
    }
    return new CalculadoraImpostosPadraoService(impostoProdutoRepository);
  }
}
