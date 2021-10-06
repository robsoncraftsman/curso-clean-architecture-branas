import PedidoService from './PedidoService';

describe('Pedido Service', () => {
  test('Deve gerar um novo número de pedido', () => {
    const pedidoService = new PedidoService();
    const numeroPedidoGerado = pedidoService.gerarNumeroPedido();
    expect(numeroPedidoGerado).toBeTruthy();
    expect(numeroPedidoGerado.length).toBe(17);
  });
});
