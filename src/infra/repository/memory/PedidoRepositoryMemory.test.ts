import Pedido from '../../../domain/entity/Pedido';
import PedidoRepositoryMemory from './PedidoRepositoryMemory';

describe('Pedido Repository Memory', () => {
  test('Deve salvar pedido na memória', async () => {
    const pedidoRepository = new PedidoRepositoryMemory();
    const pedido = new Pedido('1', '864.464.227-84', '11.111-111');
    expect(async () => {
      await pedidoRepository.save(pedido);
    }).not.toThrowError();
  });

  test('Deve encontrar pedido na memória', async () => {
    const pedidoRepository = new PedidoRepositoryMemory();
    const novoPedido = new Pedido('1', '864.464.227-84', '11.111-111');
    pedidoRepository.save(novoPedido);
    const pedidoEncontrado = await pedidoRepository.findById('1');
    expect(pedidoEncontrado).toBeTruthy();
    expect(pedidoEncontrado!.id).toBe('1');
  });

  test('Deve excluir pedido da memória', async () => {
    const pedidoRepository = new PedidoRepositoryMemory();
    const pedido = new Pedido('99', '864.464.227-84', '11.111-111');
    await pedidoRepository.save(pedido);

    const pedidoSalvo = await pedidoRepository.findById('99');
    expect(pedidoSalvo).toBeTruthy();
    expect(pedidoSalvo!.id).toBe('99');

    await pedidoRepository.delete('99');
    const pedidoExcluido = await pedidoRepository.findById('99');
    expect(pedidoExcluido).toBeFalsy();
  });
});
