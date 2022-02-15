import OperacaoEstoque from '../../../domain/entity/OperacaoEstoque';
import OperacaoEstoqueRepositoryMemory from './OperacaoEstoqueRepositoryMemory';

describe('OperacaoEstoqueRepositoryMemory', () => {
  test('Deve incluir uma operação no estoque', async () => {
    const operacaoEstoqueRepository = new OperacaoEstoqueRepositoryMemory();
    operacaoEstoqueRepository.add(new OperacaoEstoque('1', 'IN', 10, new Date()));
    const operacoesEstoque = operacaoEstoqueRepository.findAll();
    expect(operacoesEstoque).toBeTruthy();
    expect((await operacoesEstoque).length).toBe(1);
  });

  test('Deve encontrar operações no estoque de um produto', async () => {
    const operacaoEstoqueRepository = new OperacaoEstoqueRepositoryMemory();
    operacaoEstoqueRepository.add(new OperacaoEstoque('1', 'IN', 10, new Date()));
    operacaoEstoqueRepository.add(new OperacaoEstoque('1', 'IN', 20, new Date()));
    const operacoesEstoque = operacaoEstoqueRepository.findOperacoesEstoqueProduto('1');
    expect(operacoesEstoque).toBeTruthy();
    expect((await operacoesEstoque).length).toBe(2);
  });
});
