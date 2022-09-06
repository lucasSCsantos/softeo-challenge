import moment from 'moment';

export default (date: string, installments: number) => {
  if (date) {
    return moment(new Date(date))
      .utc()
      .startOf('day')
      .add(installments - 1, 'month');
  }
  return moment()
    .utc()
    .startOf('day')
    .add(installments - 1, 'month');
};
