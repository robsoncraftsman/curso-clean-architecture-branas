export default interface Database {
  save(query: string, params: any): void;
  delete(query: string, params: any): void;
  findAll(query: string, params: any): any;
  findOne(query: string, params: any): any;
}
