import OperacaoEstoque from '../entity/OperacaoEstoque';

export default class CalculadoraEstoque {
  calcularEstoque(operacoesEstoque: OperacaoEstoque[]) {
    let estoqueAtual = 0;
    for (const operacaoEstoque of operacoesEstoque) {
      if (operacaoEstoque.operacao.toUpperCase() === 'IN') {
        estoqueAtual += operacaoEstoque.quantidade;
      } else if (operacaoEstoque.operacao.toUpperCase() === 'OUT') {
        estoqueAtual -= operacaoEstoque.quantidade;
      }
    }
    return estoqueAtual;
  }
}
