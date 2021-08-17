import CpfValidator from './CpfValidator';

describe('CPFValidator', () => {
  test('CPF deve ser válido', () => {
    const cpfValidator = new CpfValidator();
    expect(cpfValidator.isValid('86446422784')).toBeTruthy();
    expect(cpfValidator.isValid('864.464.227-84')).toBeTruthy();
    expect(cpfValidator.isValid('91720489726')).toBeTruthy();
    expect(cpfValidator.isValid('917.204.897-26')).toBeTruthy();
  });

  test('CPF deve ser inválido', () => {
    const cpfValidator = new CpfValidator();
    expect(cpfValidator.isValid('00000000000')).toBeFalsy();
    expect(cpfValidator.isValid('86446422799')).toBeFalsy();
    expect(cpfValidator.isValid('864.464.227-99')).toBeFalsy();
    expect(cpfValidator.isValid('a1720489726')).toBeFalsy();
  });
});
