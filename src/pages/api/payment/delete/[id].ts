import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../lib/supabase';

async function deletePayment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    await supabase.from('payments').delete().match({ id });

    res.status(201).json({});
  }
}

export default deletePayment;
