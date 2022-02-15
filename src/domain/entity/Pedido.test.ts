import CupomDesconto from './CupomDesconto';
import Pedido from './Pedido';
import Produto from './Produto';

describe('Pedido', () => {
  test('Não deve criar pedido com CPF Inválido', () => {
    const cpf = '000.000.000-00';
    const cepDestino = '11.111.111-111';
    const id_pedido = '1';
    expect(() => new Pedido(id_pedido, cpf, cepDestino)).toThrow(new Error('CPF Inválido'));
  });

  test('Deve criar um pedido com três itens', () => {
    const cpf = '864.464.227-84';
    const cepDestino = '11.111.111-111';
    const id_pedido = '1';
    const pedido = new Pedido(id_pedido, cpf, cepDestino);
    pedido.addItem(new Produto('1', 'Macarrão'), 6, 5);
    pedido.addItem(new Produto('2', 'Carne'), 35, 2);
    pedido.addItem(new Produto('3', 'Molho tomate'), 5, 1);
    const valorItensComDesconto = pedido.getValorItensComDesconto();
    expect(valorItensComDesconto).toBe(105);
  });

  test('Deve criar um pedido com cupom desconto', () => {
    const cpf = '864.464.227-84';
    const cepDestino = '11.111.111-111';
    const id_pedido = '1';
    const pedido = new Pedido(id_pedido, cpf, cepDestino);
    const cupomDesconto = new CupomDesconto('DESC10', 10, new Date());
    pedido.addItem(new Produto('1', 'Macarrão'), 6, 5);
    pedido.addItem(new Produto('2', 'Carne'), 35, 2);
    pedido.addItem(new Produto('3', 'Molho tomate'), 5, 1);
    pedido.addCupomDesconto(cupomDesconto);
    const valorItensComDesconto = pedido.getValorItensComDesconto();
    expect(valorItensComDesconto).toBe(94.5);
  });

  test('Não deve dar desconto no pedido com cupom de desconto expirado', () => {
    const cpf = '864.464.227-84';
    const cepDestino = '11.111.111-111';
    const id_pedido = '1';
    const cupomDescontoExpirado = new CupomDesconto('DESC10', 10, new Date(2020, 1, 1));
    const pedido = new Pedido(id_pedido, cpf, cepDestino);
    expect(() => {
      pedido.addCupomDesconto(cupomDescontoExpirado);
    }).toThrow(new Error('Cupom de desconto expirado: DESC10'));
  });
});
