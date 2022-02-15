import ConsultarPedidoUseCase from '../../../application/ConsultarPedidoUseCase';
import Http from '../Http';
import Route from '../Route';

export default class ConsultarPedidoRoute implements Route {
  constructor(private consultarPedidoUseCase: ConsultarPedidoUseCase) {}

  configure(http: Http) {
    http.on('get', '/orders/${code}', async (params: any, body: any) => {
      const pedido = this.consultarPedidoUseCase.execute({ id: params.code });
      return pedido;
    });
  }
}
