import CupomDesconto from './CupomDesconto';
import Pedido from './Pedido';

describe('Pedido', () => {
  test('Não deve criar pedido com CPF Inválido', () => {
    const cpf = '000.000.000-00';

    expect(() => new Pedido(cpf)).toThrow(new Error('CPF Inválido'));
  });

  test('Deve criar um pedido com três itens', () => {
    const cpf = '864.464.227-84';
    const pedido = new Pedido(cpf);
    pedido.addItem('Macarrão', 6, 5);
    pedido.addItem('Carne', 35, 2);
    pedido.addItem('Molho tomate', 5, 1);
    const valorTotalPedido = pedido.getValorTotal();
    expect(valorTotalPedido).toBe(105);
  });

  test('Deve criar um pedido com cupom desconto', () => {
    const cpf = '864.464.227-84';
    const pedido = new Pedido(cpf);
    pedido.addItem('Macarrão', 6, 5);
    pedido.addItem('Carne', 35, 2);
    pedido.addItem('Molho tomate', 5, 1);
    pedido.addCupomDesconto(new CupomDesconto('DESC10', 10, new Date()));
    const valorTotalPedido = pedido.getValorTotal();
    expect(valorTotalPedido).toBe(94.5);
  });
});
