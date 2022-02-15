import CadastrarPedidoUseCase from '../../../application/CadastrarPedidoUseCase';
import Http from '../Http';
import Route from '../Route';

export default class CadastrarPedidoRoute implements Route {
  constructor(private cadastrarPedidoUseCase: CadastrarPedidoUseCase) {}

  configure(http: Http) {
    http.on('post', '/orders', async (params: any, body: any) => {
      const pedido = this.cadastrarPedidoUseCase.execute(body);
      return 'OK';
    });
  }
}
