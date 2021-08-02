import CupomDesconto from './CupomDesconto';

describe('Cupom Desconto', () => {
  test('Deve estar dentro da validade se data atual for menor que a do cupom', () => {
    const dataExpiracao = new Date();
    dataExpiracao.setDate(dataExpiracao.getDate() + 1);
    const cupomDesconto = new CupomDesconto('DESC10', 10, dataExpiracao);
    const isExpirado = cupomDesconto.isExpirado();
    expect(isExpirado).toBeFalsy();
  });

  test('Deve estar dentro da validade se data atual for igual que a do cupom', () => {
    const dataExpiracao = new Date();
    const cupomDesconto = new CupomDesconto('DESC10', 10, dataExpiracao);
    const isExpirado = cupomDesconto.isExpirado();
    expect(isExpirado).toBeFalsy();
  });

  test('Não deve estar dentro da validade se a data atual for maior que a do cupom', () => {
    const dataExpiracao = new Date();
    dataExpiracao.setDate(dataExpiracao.getDate() - 1);
    const cupomDesconto = new CupomDesconto('DESC10', 10, dataExpiracao);
    const isExpirado = cupomDesconto.isExpirado();
    expect(isExpirado).toBeTruthy();
  });
});
