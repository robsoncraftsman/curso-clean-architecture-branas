import axios from 'axios';

describe('CadastrarPedidoRoute', () => {
  test.skip('Deve invocar a API /orders/${code}', async function () {
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'post',
      data: {
        cpf: '864.464.227-84',
        itens: [
          { id_produto: '1', valor: 6, quantidade: 10 },
          { id_produto: '2', valor: 35, quantidade: 10 },
          { id_produto: '3', valor: 5, quantidade: 10 }
        ]
      }
    });
    const pedido = response.data;
    expect(pedido).toBe('OK');
  });
});
