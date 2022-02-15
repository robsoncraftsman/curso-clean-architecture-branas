import Http from '../Http';
import Hapi from '@hapi/hapi';

export default class HapiHttp implements Http {
  server: Hapi.Server;
  port: number;

  constructor(port: number) {
    this.port = port;
    this.server = Hapi.server({ port: port });
  }

  convertUrl(url: string) {
    return url.replace(/\$/g, '');
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.server.route({
      method,
      path: this.convertUrl(url),
      handler: async function (request: any, h: any) {
        const data = await fn(request.params, request.payload);
        return data;
      }
    });
  }

  async listen(): Promise<void> {
    await this.server.start();
  }
}
