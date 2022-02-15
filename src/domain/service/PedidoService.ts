export default class PedidoService {
  gerarNumeroPedido() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const seq = dataAtual.getTime();
    return ano.toString() + seq.toString();
  }
}
