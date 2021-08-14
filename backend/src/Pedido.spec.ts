import CupomDesconto from './CupomDesconto';
import Pedido from './Pedido';
import Produto from './Produto';

describe('Pedido', () => {
  test('Não deve criar pedido com CPF Inválido', () => {
    const cpf = '000.000.000-00';

    expect(() => new Pedido(cpf)).toThrow(new Error('CPF Inválido'));
  });

  test('Deve criar um pedido com três itens', () => {
    const cpf = '864.464.227-84';
    const pedido = new Pedido(cpf);
    pedido.addItem(new Produto('Macarrão'), 6, 5);
    pedido.addItem(new Produto('Carne'), 35, 2);
    pedido.addItem(new Produto('Molho tomate'), 5, 1);
    const valorTotalPedido = pedido.getValorTotal();
    expect(valorTotalPedido).toBe(105);
  });

  test('Deve criar um pedido com cupom desconto', () => {
    const cpf = '864.464.227-84';
    const pedido = new Pedido(cpf);
    const cupomDesconto = new CupomDesconto('DESC10', 10, new Date());
    pedido.addItem(new Produto('Macarrão'), 6, 5);
    pedido.addItem(new Produto('Carne'), 35, 2);
    pedido.addItem(new Produto('Molho tomate'), 5, 1);
    pedido.addCupomDesconto(cupomDesconto);
    const valorTotalPedido = pedido.getValorTotal();
    expect(valorTotalPedido).toBe(94.5);
  });

  test('Não deve dar desconto no pedido com cupom de desconto expirado', () => {
    const cpf = '864.464.227-84';
    const cupomDescontoExpirado = new CupomDesconto('DESC10', 10, new Date(2020, 1, 1));
    const pedido = new Pedido(cpf);
    expect(() => {
      pedido.addCupomDesconto(cupomDescontoExpirado);
    }).toThrow(new Error('Cupom de desconto expirado: DESC10'));
  });
});