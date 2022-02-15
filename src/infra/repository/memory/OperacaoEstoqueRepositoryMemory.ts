import OperacaoEstoque from '../../../domain/entity/OperacaoEstoque';
import OperacaoEstoqueRepository from '../../../domain/repository/OperacaoEstoqueRepository';

export default class OperacaoEstoqueRepositoryMemory implements OperacaoEstoqueRepository {
  private operacoesEstoque: OperacaoEstoque[];

  constructor() {
    this.operacoesEstoque = [];
  }

  async add(operacaoEstoque: OperacaoEstoque): Promise<void> {
    this.operacoesEstoque.push(operacaoEstoque);
    return Promise.resolve();
  }

  async findAll(): Promise<OperacaoEstoque[]> {
    return Promise.resolve(this.operacoesEstoque);
  }

  async findOperacoesEstoqueProduto(idProduto: string): Promise<OperacaoEstoque[]> {
    const operacoesEstoque = this.operacoesEstoque.filter((operacaoEstoque) => operacaoEstoque.idProduto === idProduto);
    return Promise.resolve(operacoesEstoque);
  }
}
