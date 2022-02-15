export default class OperacaoEstoque {
  constructor(public idProduto: string, public operacao: string, public quantidade: number, public data: Date) {}
}
