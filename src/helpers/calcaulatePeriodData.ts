import currency from 'currency.js';
import { Payment } from '../@types/supabase';

const endDateIsNextYear = (startDate: Date, endDate: Date) =>
  new Date(endDate).getFullYear() - new Date(startDate).getFullYear() > 0;

export default async (data: Payment[], period: string) => {
  let periodAmount: number = 0;

  data.forEach(payment => {
    if (period === 'day' || period === 'month') {
      periodAmount = currency(periodAmount).add(
        payment.installment_amount
      ).value;
    } else if (period === 'year') {
      if (!payment.endDate) {
        periodAmount = currency(periodAmount).add(
          payment.installment_amount
        ).value;
      } else if (endDateIsNextYear(payment.startDate, payment.endDate)) {
        if (
          new Date().getFullYear() === new Date(payment.endDate).getFullYear()
        ) {
          periodAmount = currency(periodAmount).add(
            payment.installment_amount *
              (payment.installments -
                (12 - new Date(payment.startDate).getMonth()))
          ).value;
        } else {
          periodAmount = currency(periodAmount).add(
            payment.installment_amount *
              (12 - new Date(payment.startDate).getMonth())
          ).value;
        }
      } else {
        periodAmount = currency(periodAmount).add(
          payment.installment_amount * payment.installments
        ).value;
      }
    }
  });

  const currencyData = currency(periodAmount, { symbol: 'R$' });

  return {
    income: currencyData.format(),
    amount: currencyData.value,
    data: data.length
  };
};
