import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const IncomeCardContainer = styled(Card)`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
`;

export const IncomeCardLabel = styled.p`
  color: ${props => props.theme.colors.label};
`;
