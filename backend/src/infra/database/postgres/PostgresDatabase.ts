import pgp from 'pg-promise';
import Database from '../Database';

export default class PostgresDatabase implements Database {
  pgp: any;

  async save(query: string, params: any) {
    await this.pgp.none(query, params);
  }

  async delete(query: string, params: any) {
    await this.pgp.none(query, params);
  }

  async findAll(query: string, params: any) {
    return await this.pgp.query(query, params);
  }

  async findOne(query: string, params: any) {
    return await this.pgp.oneOrNone(query, params);
  }

  async connect() {
    this.pgp = await pgp()('postgres://admin:pwd@localhost:5432/db');
  }

  async disconnect() {
    await this.pgp.$pool.end();
  }
}
