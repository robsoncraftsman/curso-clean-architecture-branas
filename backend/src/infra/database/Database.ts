export default interface Database {
  findAll(query: string, params: any): any;
  findOne(query: string, params: any): any;
}
