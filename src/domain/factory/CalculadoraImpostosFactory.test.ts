import ImpostoProdutoRepositoryMemory from '../../infra/repository/memory/ImpostoProdutoRepositoryMemory';
import Produto from '../entity/Produto';
import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosEspecialService from '../service/CalculadoraImpostosEspecialService';
import CalculadoraImpostosPadraoService from '../service/CalculadoraImpostosPadraoService';
import CalculadoraImpostosFactory from './CalculadoraImpostosFactory';

describe('CalculadoraImpostosFactory', () => {
  test('Deve criar calculadora impostos especial', () => {
    const calculadoraImpostosService = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-01-01'),
      new ImpostoProdutoRepositoryMemory()
    );
    expect(calculadoraImpostosService).toBeInstanceOf(CalculadoraImpostosEspecialService);
  });

  test('Deve criar calculadora impostos padrão', () => {
    const calculadoraImpostosServicePrimeiroMes = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-02-01'),
      new ImpostoProdutoRepositoryMemory()
    );
    expect(calculadoraImpostosServicePrimeiroMes).toBeInstanceOf(CalculadoraImpostosPadraoService);

    const calculadoraImpostosServiceUltimoMes = CalculadoraImpostosFactory.createCalculadoraImpostosService(
      new Date('2000-12-31'),
      new ImpostoProdutoRepositoryMemory()
    );
    expect(calculadoraImpostosServiceUltimoMes).toBeInstanceOf(CalculadoraImpostosPadraoService);
  });
});
