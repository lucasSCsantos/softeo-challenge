import { NextApiRequest, NextApiResponse } from 'next';
import checkOrInsertData from '../../../helpers/checkOrInsertData';
import supabase from '../../../lib/supabase';

async function payment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, installment, date, procedure, pacient } = req.body;

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
        date,
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
