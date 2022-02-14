import ImpostoProduto from '../entity/ImpostoProduto';
import ItemPedido from '../entity/ItemPedido';
import Produto from '../entity/Produto';
import ImpostoProdutoRepository from '../repository/ImpostoProdutoRepository';
import CalculadoraImpostosEspecialService from './CalculadoraImpostosEspecialService';

const createImpostoProdutoRepository = () => {
  class ImpostoProdutoRepositoryStub implements ImpostoProdutoRepository {
    impostoPodutos = [
      new ImpostoProduto(new Produto('1', 'Câmera', 1, 20, 15, 10, 1), 20),
      new ImpostoProduto(new Produto('2', 'Guitarra', 3, 100, 30, 10, 1), 10),
      new ImpostoProduto(new Produto('3', 'Geladeira', 40, 200, 100, 50, 1), 5)
    ];

    async findValorImposto(produto: Produto): Promise<number> {
      const impostoProduto = this.impostoPodutos.find((impostoProduto) => impostoProduto.produto.id === produto.id);
      if (impostoProduto) {
        return Promise.resolve(impostoProduto.valor);
      } else {
        return Promise.resolve(0);
      }
    }
  }
  return new ImpostoProdutoRepositoryStub();
};

const createSut = () => {
  return new CalculadoraImpostosEspecialService(createImpostoProdutoRepository());
};

describe('CalculadoraImpostosEspecial', () => {
  test('Deve calcular imposto corretamente para Câmera', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('1', 'Câmera', 1, 20, 15, 10, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(1);
  });

  test('Deve calcular imposto corretamente para Guitarra', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('2', 'Guitarra', 3, 100, 30, 10, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(0.5);
  });

  test('Deve calcular imposto corretamente para Geladeira', async () => {
    const calculadoraImpostosService = createSut();
    const itemPedido = new ItemPedido(new Produto('3', 'Geladeira', 40, 200, 100, 50, 1), 10, 1);
    const valorImposto = await calculadoraImpostosService.calcularImposto(itemPedido);
    expect(valorImposto).toBe(0.25);
  });
});
