import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import supabase from '../../../lib/supabase';

export type Period = 'day' | 'month' | 'year';

async function getByPeriod(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { period } = req.query;

    if (period !== ('day' || 'month' || 'year')) {
      throw new Error(
        'This period does not exist. To get other period try GET custom period!'
      );
    }

    const start = moment()
      .utc()
      .startOf(period as Period);

    const end = moment()
      .utc()
      .endOf(period as Period);

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .gt('date', start)
      .lt('date', end);

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json(data);
  }
}

export default getByPeriod;
