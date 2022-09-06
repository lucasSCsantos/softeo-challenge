import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { IncomeCardContainer } from './styles';

export interface IncomeCardProps {
  data: {
    period: string;
    income: string;
    // variation: number;
  };
}

export default function IncomeCard({ data }: IncomeCardProps) {
  return (
    <IncomeCardContainer>
      <Card.Body>
        <Container>
          <p>{data.period} income</p>
          <Row>
            <Col>
              <h1>{data.income}</h1>
            </Col>
            <Col>
              <Badge>
                {/* {data.variation > 0 ? '+' : '-'}
                {data.variation}% */}
              </Badge>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </IncomeCardContainer>
  );
}
