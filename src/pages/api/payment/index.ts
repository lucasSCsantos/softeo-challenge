import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import checkOrInsertData from '../../../helpers/checkOrInsertData';
import supabase from '../../../lib/supabase';

export interface RequestBody {
  amount: number;
  installment: number;
  date: string;
  procedure: string;
  pacient: string;
}

async function payment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, installment, date, procedure, pacient }: RequestBody =
      req.body;

    const today = moment().startOf('day').hour(-3).toDate();

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

    await supabase.from('payments').insert([
      {
        amount,
        installment,
        date: date || today,
        procedure: procedureId || null,
        pacient: pacientId || null
      }
    ]);

    res.status(201).json({});
  } else if (req.method === 'GET') {
    const response = await supabase
      .from('payments')
      .select('*, procedure(procedure), pacient(pacient)');

    res.status(200).json(response.data);
  }
}

export default payment;
