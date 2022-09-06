import { Payment } from '../supabase';

export interface GetPeriodResponse {
  period: 'day' | 'month' | 'year' | 'customer';
  income: string;
  amount: number;
  data: Payment[];
}
