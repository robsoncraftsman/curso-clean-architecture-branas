import Produto from './Produto';

export default class CalcularFreteService {
  calcularFreteProduto(produto: Produto, distancia: number) {
    const volume = produto.volume;
    const densidade = produto.densidade;
    return distancia * volume * (densidade / 100);
  }
}
