import ImpostoProdutoRepositoryMemory from '../../infra/repository/memory/ImpostoProdutoRepositoryMemory';
import ImpostoProduto from '../entity/ImpostoProduto';
import ItemPedido from '../entity/ItemPedido';
import Produto from '../entity/Produto';
import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosPadraoService from './CalculadoraImpostosPadraoService';

const createSut = () => {
  return new CalculadoraImpostosPadraoService(new ImpostoProdutoRepositoryMemory());
};

describe('CalculadoraImpostosPadraoService', () => {
  test('Deve calcular imposto corretamente para Câmera', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('1', 'Câmera', 1, 20, 15, 10, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(2);
  });
  test('Deve calcular imposto corretamente para Guitarra', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('2', 'Guitarra', 3, 100, 30, 10, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(1);
  });
  test('Deve calcular imposto corretamente para Geladeira', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('3', 'Geladeira', 40, 200, 100, 50, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(0.5);
  });
});
