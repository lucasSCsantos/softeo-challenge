import Head from 'next/head';
import axios from 'axios';
import IncomeCard from '../components/IncomeCard';

export default function Home({ day, month, year }) {
  return (
    <div>
      <Head>
        <title>Softeo Challenge</title>
        <meta name="description" content="Softeo challenge" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <IncomeCard data={day} />
        <IncomeCard data={month} />
        <IncomeCard data={year} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const axiosPaymentServer = axios.create({
    baseURL: 'http://localhost:3000/api/payment/',
    timeout: 15000,
    method: 'GET'
  });

  const { data: day } = await axiosPaymentServer('day');
  const { data: month } = await axiosPaymentServer('month');
  const { data: year } = await axiosPaymentServer('year');

  return { props: { day, month, year } };
}
