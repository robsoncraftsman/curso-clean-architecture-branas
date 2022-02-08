import Http from '../Http';
import express from 'express';

export default class ExpressHttp implements Http {
  app: any;
  port: number;

  constructor(port: number) {
    this.app = express();
    this.app.use(express.json());
    this.port = port;
  }

  convertUrl(url: string) {
    return url.replace(/\$\{/g, ':').replace(/\}/g, '');
  }

  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](this.convertUrl(url), async (req: any, res: any) => {
      const data = await fn(req.params, req.body);
      res.json(data);
    });
  }

  async listen(): Promise<void> {
    this.app.listen(this.port);
  }
}
