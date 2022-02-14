import axios from 'axios';

describe('ConsultarPedidoRoute', () => {
  test.skip('Deve invocar a API /orders/${code}', async function () {
    const response = await axios({
      url: 'http://localhost:3000/orders/1',
      method: 'get'
    });
    const pedido = response.data;
    expect(pedido).toBeTruthy();
    expect(pedido.id).toBeTruthy();
    expect(pedido.itens.length).toBe(1);
  });
});
