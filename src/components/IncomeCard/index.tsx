import { Card, Col, Container, Row } from 'react-bootstrap';
import { Payment } from '../../@types/supabase';
import { IncomeCardContainer, IncomeCardLabel } from './styles';

export interface IncomeCardProps {
  data: {
    period: string;
    income: string;
    data: Payment[];
  };
}

export default function IncomeCard({ data }: IncomeCardProps) {
  return (
    <IncomeCardContainer>
      <Card.Body>
        <Container>
          <IncomeCardLabel>{data.period} income</IncomeCardLabel>
          <Row>
            <Col>
              <h2>{data.income}</h2>
            </Col>
            {/* <Col>
              <Badge>
                {data.variation > 0 ? '+' : '-'}
                {data.variation}%
              </Badge>
            </Col> */}
          </Row>
        </Container>
      </Card.Body>
    </IncomeCardContainer>
  );
}
