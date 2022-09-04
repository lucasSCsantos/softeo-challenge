import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../lib/supabase';

async function payment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, installment, date, procedure, pacient } = req.body;
    let procedureId: undefined | string;
    let pacientId: undefined | string;

    if (procedure) {
      const response = await supabase
        .from('procedures')
        .insert([
          {
            procedure
          }
        ])
        .select('id');
      procedureId = response.data[0] ? response.data[0].id : undefined;
    }

    if (pacient) {
      const response = await supabase
        .from('pacients')
        .insert([
          {
            pacient
          }
        ])
        .select('id');

      pacientId = response.data[0] ? response.data[0].id : undefined;
    }

    console.log(procedureId, pacientId);
    const a = await supabase.from('payments').insert([
      {
        amount,
        installment,
        date,
        procedure: procedureId || null,
        pacient: pacientId || null
      }
    ]);
    console.log(a);
    res.status(201).json({});
  }
}

export default payment;
