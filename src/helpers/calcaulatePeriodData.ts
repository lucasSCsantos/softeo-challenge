import currency from 'currency.js';
import moment, { Moment } from 'moment';
import { Payment } from '../@types/supabase';

const getPendingInstallments = (
  { installments, startDate, endDate }: Payment,
  period: string,
  start: Moment,
  end: Moment
) => {
  const year = moment().year();
  const startDateYear = moment(new Date(startDate)).year();
  const endDateYear = moment(new Date(endDate)).year();
  const startDateMonth = moment(new Date(startDate)).month();
  const endDateMonth = moment(new Date(endDate)).month();
  const periodStartMonth = moment(start).month();
  const periodEndMonth = moment(end).month();

  if (!endDate || period === 'day' || period === 'month') {
    return 1;
  }
  if (period === 'year') {
    if (startDateYear === endDateYear) {
      // mesmo ano retorna o total de parcelas
      return installments;
    }
    if (year === endDateYear) {
      // se os anos são diferentes e estamos no ultimo ano, retorna as parcelas pendentes
      return installments - (12 - startDateMonth);
    }
    if (year === startDateYear) {
      return 12 - startDateMonth;
    }
  }
  if (period === 'custom') {
    if (moment(new Date(endDate)) > end) {
      // se o ano do fim do pagemento for maior que do fim do periodo selecionado, retorna a quantidade de meses do periodo
      return periodEndMonth - periodStartMonth;
    }

    if (endDateMonth <= periodEndMonth) {
      // se o mês do do fim do pagamento for menor ou igual ao fim do periodo selecionado, retorna a diferença entre eles

      return endDateMonth - periodStartMonth || 1;
    }

    return periodEndMonth - periodStartMonth;
  }
  return 1;
};

export default async (
  data: Payment[],
  period: string,
  start: Moment | undefined,
  end: Moment | undefined
) => {
  let periodAmount: number = 0;

  const currencyAdd = (acc: number, amount: number, installments: number) => {
    periodAmount = currency(acc).add(amount * installments).value;
  };

  data.forEach(payment => {
    const pendingInstallments = getPendingInstallments(
      payment,
      period,
      start,
      end
    );

    currencyAdd(periodAmount, payment.installment_amount, pendingInstallments);
  });

  const currencyData = currency(periodAmount, { symbol: 'R$' });
  const income = currencyData.format();

  return {
    period,
    income,
    amount: currencyData.value,
    data
  };
};
