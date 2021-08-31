import pgp from 'pg-promise';
import Database from '../Database';

export default class PostgresDatabase implements Database {
  pgp: any;

  findAll(query: string, params: any) {
    return this.pgp.query(query, params);
  }

  findOne(query: string, params: any) {
    return this.pgp.oneOrNone(query, params);
  }

  connect() {
    this.pgp = pgp()('postgres://admin:pwd@localhost:5432/db');
  }

  disconnect() {
    this.pgp.$pool.end();
  }
}
