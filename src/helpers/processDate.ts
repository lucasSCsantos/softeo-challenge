import moment from 'moment';

export enum Period {
  day = 'day',
  month = 'month',
  year = 'year'
}

export const startOfDate = (
  date: Date | undefined,
  period: Period | string
) => {
  if (period === 'custom') {
    return moment(date).utc().startOf('day');
  }

  if (Period[`${period}`]) {
    return moment()
      .utc(true)
      .startOf(period as Period);
  }

  return null;
};

export const endOfDate = (date: Date | undefined, period: string) => {
  if (period === 'custom') {
    return moment(date).utc().endOf('day');
  }

  if (Period[`${period}`]) {
    return moment()
      .utc(true)
      .endOf(period as Period);
  }

  return null;
};
