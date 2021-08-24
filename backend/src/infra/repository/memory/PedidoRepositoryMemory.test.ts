import Pedido from '../../../domain/entity/Pedido';
import PedidoRepositoryMemory from './PedidoRepositoryMemory';

describe('Pedido Repository Memory', () => {
  test('Deve salvar pedido na memória', () => {
    const pedidoRepositoryMemory = new PedidoRepositoryMemory();
    const pedido = new Pedido('1', '864.464.227-84', '11.111-111');
    expect(() => pedidoRepositoryMemory.save(pedido)).not.toThrowError();
  });

  test('Deve encontrar pedido na memória', () => {
    const pedidoRepositoryMemory = new PedidoRepositoryMemory();
    const novoPedido = new Pedido('1', '864.464.227-84', '11.111-111');
    pedidoRepositoryMemory.save(novoPedido);
    const pedidoEncontrado = pedidoRepositoryMemory.findById('1');
    expect(pedidoEncontrado).not.toBeNull();
    expect(pedidoEncontrado!.id).toBe('1');
  });
});
