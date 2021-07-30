import CPFValidator from './CpfValidator';

export default class Cpf {
  private _cpf: string;
  private cpfValidator = new CPFValidator();

  constructor(cpf: string) {
    if (!this.cpfValidator.isValid(cpf)) {
      throw new Error('CPF Inválido');
    }
    this._cpf = cpf;
  }

  get cpf() {
    return this._cpf;
  }
}
