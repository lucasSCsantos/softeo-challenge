import { NextApiRequest, NextApiResponse } from 'next';
// import { Moment } from 'moment';
import { Moment } from 'moment';
import supabase from '../../../lib/supabase';
import { endOfDate, Period, startOfDate } from '../../../helpers/processDate';
import calcaulatePeriodData from '../../../helpers/calcaulatePeriodData';

export interface Body {
  startDate: string;
  endDate: string;
}

async function getByPeriod(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { period } = req.query;
    const { startDate, endDate }: Body = req.body;

    const start: Moment = startOfDate(new Date(startDate), period as Period);
    const end: Moment = endOfDate(new Date(endDate), period as Period);

    if (!start && !end) {
      throw new Error('This period is not valid!');
    }

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .or(
        `and(startDate.gte.${start},startDate.lte.${end}),and(endDate.gte.${start},endDate.lte.${end})`
      );

    if (error) {
      throw new Error(error.message);
    }

    const periodData = await calcaulatePeriodData(
      data,
      period as string,
      start,
      end
    );

    res.status(200).json(periodData);
  }
}

export default getByPeriod;
