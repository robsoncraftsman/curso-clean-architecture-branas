import axios from 'axios';

describe('Http', () => {
  test('Deve invocar a API /orders/${code}', async function () {
    const response = await axios({
      url: 'http://localhost:3000/orders/1',
      method: 'get'
    });
    const pedido = response.data;
    expect(pedido.id).toBe('1');
    expect(pedido.itens.length).toBe(1);
  });
});
