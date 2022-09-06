import { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { CardContainer } from '../../styles';

export interface FormData {
  amount: number;
  installment: number;
  date: string;
  today: boolean;
  pacient: string;
  procedure: string;
}

export default function PaymentForm() {
  const { register, handleSubmit } = useForm();
  const [today, setToday] = useState(false);
  const onSubmit = (data: FormData) => console.log(data);

  useEffect(() => {}, [today]);

  return (
    <CardContainer>
      <CardContainer.Header>
        <CardContainer.Title className="m-0 p-2" as="h4">
          New Payment
        </CardContainer.Title>
      </CardContainer.Header>
      <CardContainer.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel label="Amount" className="mb-3">
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                required
                {...register('amount', {
                  valueAsNumber: true
                })}
              />
              <Form.Control.Feedback type="invalid">
                Please set an amount
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Installment" className="mb-3">
              <Form.Control
                type="number"
                min="1"
                max="12"
                placeholder="1"
                defaultValue="1"
                {...register('installment', {
                  valueAsNumber: true
                })}
              />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel label="Date" className="mb-3">
                  <Form.Control
                    type="date"
                    min="1"
                    max="12"
                    placeholder="dd/mm/aaaa"
                    {...register('date')}
                    required={!today}
                    disabled={today}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Today"
                  className="mt-3"
                  onChange={() => setToday(!today)}
                />
              </Col>
            </Row>
            <FloatingLabel label="Pacient" className="mb-3">
              <Form.Control
                type="string"
                placeholder="Jonh Doe"
                {...register('pacient')}
              />
            </FloatingLabel>
            <FloatingLabel label="Procedure" className="mb-3">
              <Form.Control
                type="string"
                placeholder="Tooth Whitening"
                {...register('procedure')}
              />
            </FloatingLabel>
          </Form.Group>
          <Button type="submit" size="lg">
            Send Payment
          </Button>
        </Form>
      </CardContainer.Body>
    </CardContainer>
  );
}
