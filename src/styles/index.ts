/* eslint-disable import/prefer-default-export */
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 80vw;
  height: 100vh;
  margin: 0 auto;
`;

export const CardContainer = styled(Card)`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
`;
