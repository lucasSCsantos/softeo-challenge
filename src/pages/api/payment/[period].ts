import { NextApiRequest, NextApiResponse } from 'next';
import moment, { Moment } from 'moment';
import supabase from '../../../lib/supabase';

// export type Period = 'day' | 'month' | 'year';

enum Period {
  day = 'day',
  month = 'month',
  year = 'year'
}

export interface Body {
  startDate: string;
  endDate: string;
}

async function getByPeriod(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { period } = req.query;
    const { startDate, endDate }: Body = req.body;

    let start: Moment;
    let end: Moment;

    if (period === 'custom') {
      start = moment(new Date(startDate)).utc().startOf('day');
      end = moment(new Date(endDate)).utc().endOf('day');
    } else if (Period[`${period}`]) {
      start = moment()
        .utc()
        .startOf(period as Period);

      end = moment()
        .utc()
        .endOf(period as Period);
    } else {
      throw new Error('This period is not valid!');
    }

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
