import Produto from './Produto';

export default class CalcularFreteService {
  private VALOR_MINIMO_FRETE = 10;

  calcularFreteProduto(produto: Produto, distancia: number) {
    const volume = produto.volume;
    const densidade = produto.densidade;
    const valorFrete = distancia * volume * (densidade / 100);
    if (valorFrete < this.VALOR_MINIMO_FRETE) {
      return this.VALOR_MINIMO_FRETE;
    }
    return valorFrete;
  }
}
