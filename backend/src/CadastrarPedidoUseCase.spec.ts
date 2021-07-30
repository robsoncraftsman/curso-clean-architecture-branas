import CadastrarPedidoUseCase from './CadastrarPedidoUseCase';

describe('CadastrarPedidoUseCase', () => {
  test('Deve cadastrar pedido', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: [
        { produto: 'Macarrão', quantidade: 6, valor: 5 },
        { produto: 'Carne', quantidade: 35, valor: 2 },
        { produto: 'Molho tomate', quantidade: 5, valor: 1 }
      ],
      cupomDesconto: 'DESC10'
    };
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase();
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorTotalPedido).toBe(94.5);
  });
});
