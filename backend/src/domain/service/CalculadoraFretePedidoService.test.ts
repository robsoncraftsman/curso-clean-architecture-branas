import Pedido from '../entity/Pedido';
import Produto from '../entity/Produto';
import CalculadoraDistanciaEntreCeps from '../gateway/CalculadoraDistanciaEntreCeps';
import CalculadoraFretePedidoService from './CalculadoraFretePedidoService';
import CalculadoraFreteProdutoService from './CalculadoraFreteProdutoService';

describe('Calcular Frete Pedido', () => {
  const createCalculadoraDistanciaEntreCepsStub = (): CalculadoraDistanciaEntreCeps => {
    class CalculadoraDistanciaEntreCepsStub implements CalculadoraDistanciaEntreCeps {
      calcularDistanciaEntreCeps(cepOrigem: string, cepDestino: string): number {
        return 1000;
      }
    }
    return new CalculadoraDistanciaEntreCepsStub();
  };

  const createCalculadoraFreteProdutoService = (): CalculadoraFreteProdutoService => {
    return new CalculadoraFreteProdutoService();
  };

  const createCalculadoraFretePedidoService = (): CalculadoraFretePedidoService => {
    return new CalculadoraFretePedidoService(
      createCalculadoraDistanciaEntreCepsStub(),
      createCalculadoraFreteProdutoService()
    );
  };

  test('Deve calcular frete para o pedido', () => {
    const cpf = '864.464.227-84';
    const cepDestino = '11.111.111-111';
    const id_pedido = '1';
    const pedido = new Pedido(id_pedido, cpf, cepDestino);
    pedido.addItem(new Produto('1', 'Câmera', 1, 20, 15, 10), 6, 5);
    const calculadoraFretePedidoService = createCalculadoraFretePedidoService();
    const valorFretePedido = calculadoraFretePedidoService.calcularFretePedido(pedido);
    expect(valorFretePedido).toBe(50);
  });
});
