import ExpressHttp from './infra/http/server/ExpressHttp';
//import HapiHttp from './infra/http/server/HapiHttp';
import ConsultarPedidoRoute from './infra/http/routes/ConsultarPedidoRoute';
import PostgresDatabase from './infra/database/postgres/PostgresDatabase';
import PedidoRepositoryDatabase from './infra/repository/database/PedidoRepositoryDatabase';
import ConsultarPedidoUseCase from './application/ConsultarPedidoUseCase';

const postgresDatabase = new PostgresDatabase();
postgresDatabase.connect();

const pedidoRepository = new PedidoRepositoryDatabase(postgresDatabase);
const consultarPedidoUseCase = new ConsultarPedidoUseCase(pedidoRepository);
const consultarPedidoRoute = new ConsultarPedidoRoute(consultarPedidoUseCase);

const http = new ExpressHttp(3000);
//const http = new HapiHttp(3000);
consultarPedidoRoute.configure(http);
http.listen();
