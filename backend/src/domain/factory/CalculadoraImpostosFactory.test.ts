import Produto from '../entity/Produto';
import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosEspecialService from '../service/CalculadoraImpostosEspecialService';
import CalculadoraImpostosPadraoService from '../service/CalculadoraImpostosPadraoService';
import CalculadoraImpostosFactory from './CalculadoraImpostosFactory';

const createImpostoProdutoRepository = () => {
  class ImpostoProdutoRepositoryStub implements ImpostoProdutoRepository {
    async findValorImposto(produto: Produto): Promise<number> {
      return Promise.resolve(0);
    }
  }
  return new ImpostoProdutoRepositoryStub();
};

describe('CalculadoraImpostosFactory', () => {
  test('Deve criar calculadora impostos especial', () => {
    const calculadoraImpostosService = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-01-01'),
      createImpostoProdutoRepository()
    );
    expect(calculadoraImpostosService).toBeInstanceOf(CalculadoraImpostosEspecialService);
  });

  test('Deve criar calculadora impostos padrão', () => {
    const calculadoraImpostosServicePrimeiroMes = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-02-01'),
      createImpostoProdutoRepository()
    );
    expect(calculadoraImpostosServicePrimeiroMes).toBeInstanceOf(CalculadoraImpostosPadraoService);

    const calculadoraImpostosServiceUltimoMes = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-12-31'),
      createImpostoProdutoRepository()
    );
    expect(calculadoraImpostosServiceUltimoMes).toBeInstanceOf(CalculadoraImpostosPadraoService);
  });
});
