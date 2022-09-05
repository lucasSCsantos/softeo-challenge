import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import checkOrInsertData from '../../../helpers/checkOrInsertData';
import supabase from '../../../lib/supabase';
import getInstallmentAmount from '../../../helpers/getInstallmentAmount';

export interface Body {
  amount: number;
  installments: number;
  date: string;
  procedure: string;
  pacient: string;
}

async function payment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, installments, date, procedure, pacient }: Body = req.body;

    const today = moment().startOf('day').hour(-3).toDate();

    const installmentAmount = getInstallmentAmount(amount, installments);

    const procedureId: undefined | string = await checkOrInsertData(
      procedure,
      'procedures',
      'procedure'
    );

    const pacientId: undefined | string = await checkOrInsertData(
      pacient,
      'pacients',
      'pacient'
    );

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          amount,
          installments,
          date: date || today,
          procedure: procedureId || null,
          pacient: pacientId || null,
          installment_amount: installmentAmount
        }
      ])
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json(data);
  } else if (req.method === 'GET') {
    const response = await supabase
      .from('payments')
      .select('*, procedure(procedure), pacient(pacient)');

    res.status(200).json(response.data);
  }
}

export default payment;
