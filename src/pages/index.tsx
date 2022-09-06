import Head from 'next/head';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import IncomeCard from '../components/IncomeCard';
import { MainContainer } from '../styles';
import { GetPeriodResponse } from '../@types/api';

export interface IncomeCardProps {
  [key: string]: GetPeriodResponse;
}

export default function Home({ day, month, year }) {
  return (
    <div>
      <Head>
        <title>Softeo Challenge</title>
        <meta name="description" content="Softeo challenge" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <MainContainer>
        <Row className="mt-5">
          {[day, month, year].map((period: GetPeriodResponse) => (
            <Col key={period.period} className="mt-2">
              <IncomeCard data={period} />
            </Col>
          ))}
        </Row>
        <Row className="mt-3">
          <Col>
            <IncomeCard data={day} />
          </Col>
          <Col>
            <IncomeCard data={month} />
          </Col>
        </Row>
      </MainContainer>
    </div>
  );
}

export async function getServerSideProps() {
  const axiosPeriodServer = axios.create({
    baseURL: 'http://localhost:3000/api/payment/',
    timeout: 15000,
    method: 'GET'
  });

  const { data: day } = await axiosPeriodServer('day');
  const { data: month } = await axiosPeriodServer('month');
  const { data: year } = await axiosPeriodServer('year');

  return { props: { day, month, year } };
}
