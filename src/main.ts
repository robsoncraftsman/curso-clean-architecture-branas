import ExpressHttp from './infra/http/server/ExpressHttp';
//import HapiHttp from './infra/http/server/HapiHttp';
import ConsultarPedidoRoute from './infra/http/routes/ConsultarPedidoRoute';
import PostgresDatabase from './infra/database/postgres/PostgresDatabase';
import PedidoRepositoryDatabase from './infra/repository/database/PedidoRepositoryDatabase';
import ConsultarPedidoUseCase from './application/ConsultarPedidoUseCase';
import CadastrarPedidoRoute from './infra/http/routes/CadastrarPedidoRoute';
import CadastrarPedidoUseCase from './application/CadastrarPedidoUseCase';
import CupomDescontoRepositoryDatabase from './infra/repository/database/CupomDescontoRepositoryDatabase';
import ProdutoRepositoryDatabase from './infra/repository/database/ProdutoRepositoryDatabase';
import CalculadoraFretePedidoService from './domain/service/CalculadoraFretePedidoService';
import PedidoService from './domain/service/PedidoService';
import CalculadoraFreteProdutoService from './domain/service/CalculadoraFreteProdutoService';
import CalculadoraDistanciaEntreCeps from './domain/gateway/CalculadoraDistanciaEntreCeps';
import ImpostoProdutoRepository from './domain/repository/ImpostoProdutoRepository';
import Produto from './domain/entity/Produto';
import OperacaoEstoqueRepositoryMemory from './infra/repository/memory/OperacaoEstoqueRepositoryMemory';
import OperacaoEstoqueRepository from './domain/repository/OperacaoEstoqueRepository';
import OperacaoEstoque from './domain/entity/OperacaoEstoque';

const database = new PostgresDatabase();
database.connect();

const pedidoRepository = new PedidoRepositoryDatabase(database);

const consultarPedidoUseCase = new ConsultarPedidoUseCase(pedidoRepository);
const consultarPedidoRoute = new ConsultarPedidoRoute(consultarPedidoUseCase);

const cupomDescontoRepository = new CupomDescontoRepositoryDatabase(database);
const produtoRepository = new ProdutoRepositoryDatabase(database);
const createCalculadoraDistanciaEntreCepsStub = (): CalculadoraDistanciaEntreCeps => {
  class CalculadoraDistanciaEntreCepsStub implements CalculadoraDistanciaEntreCeps {
    calcularDistanciaEntreCeps(cepOrigem: string, cepDestino: string): number {
      return 1000;
    }
  }
  return new CalculadoraDistanciaEntreCepsStub();
};
const calculadoraFreteProdutoService = new CalculadoraFreteProdutoService();
const calculadoraFretePedidoService = new CalculadoraFretePedidoService(
  createCalculadoraDistanciaEntreCepsStub(),
  calculadoraFreteProdutoService
);
const createImpostoProdutoZeradoRepository = () => {
  class ImpostoProdutoZeradoRepository implements ImpostoProdutoRepository {
    async findValorImposto(produto: Produto): Promise<number> {
      return Promise.resolve(0);
    }
  }
  return new ImpostoProdutoZeradoRepository();
};
const impostoProdutoRepository = createImpostoProdutoZeradoRepository();
const createOperacaoEstoqueCheioRepository = (): OperacaoEstoqueRepository => {
  const operacaoEstoqueCheioRepository = new OperacaoEstoqueRepositoryMemory();
  operacaoEstoqueCheioRepository.add(new OperacaoEstoque('1', 'IN', 100, new Date()));
  operacaoEstoqueCheioRepository.add(new OperacaoEstoque('2', 'IN', 100, new Date()));
  operacaoEstoqueCheioRepository.add(new OperacaoEstoque('3', 'IN', 100, new Date()));
  return operacaoEstoqueCheioRepository;
};
const operacaoEstoqueRepository = createOperacaoEstoqueCheioRepository();

const pedidoService = new PedidoService();

const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
  cupomDescontoRepository,
  produtoRepository,
  calculadoraFretePedidoService,
  pedidoService,
  pedidoRepository,
  impostoProdutoRepository,
  operacaoEstoqueRepository
);
const cadastrarPedidoRoute = new CadastrarPedidoRoute(cadastrarPedidoUseCase);

const http = new ExpressHttp(3000);
//const http = new HapiHttp(3000);
consultarPedidoRoute.configure(http);
cadastrarPedidoRoute.configure(http);
http.listen();
