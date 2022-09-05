import currency from 'currency.js';

export default (amount: number, installments: number) =>
  currency(amount).divide(installments).value;
