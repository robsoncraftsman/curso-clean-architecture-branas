import Http from './Http';

export default interface Route {
  configure(http: Http): void;
}
