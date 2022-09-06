import Head from 'next/head';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import IncomeCard from '../components/IncomeCard';
import { MainContainer } from '../styles';

export default function Home({ day, month, year }) {
  return (
    <div>
      <Head>
        <title>Softeo Challenge</title>
        <meta name="description" content="Softeo challenge" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <MainContainer>
        <Row>
          <Col>
            <IncomeCard data={day} />
          </Col>
          <Col>
            <IncomeCard data={month} />
          </Col>
          <Col>
            <IncomeCard data={year} />
          </Col>
        </Row>
      </MainContainer>
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
