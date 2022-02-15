import OperacaoEstoque from '../entity/OperacaoEstoque';

export default interface OperacaoEstoqueRepository {
  add(operacaoEstoque: OperacaoEstoque): Promise<void>;
  findAll(): Promise<OperacaoEstoque[]>;
  findOperacoesEstoqueProduto(idProduto: string): Promise<OperacaoEstoque[]>;
}
