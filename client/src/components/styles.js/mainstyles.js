import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

export const SelectedListGroupItem = styled(ListGroup.Item)`
  text-decoration: underline #0d6efd;
  font-weight: bold;
`;

export const UnselectedListGroupItem = styled(ListGroup.Item)`
  cursor: pointer;
`;

export const StatDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
`

export const StatNumber = styled.p`
  font-size: 4rem;
  font-weight: 400;
  line-height: 1em;
  color: #1b1c1d;
  color: ${props => props.statColor || "black"};
  text-transform: uppercase;
  text-align: center;
`

export const StatLabel = styled.p`
  margin-top: 0;
  font-size: 1em;
  font-weight: 700;
  color: ${props => props.statColor || "black"};
  text-transform: uppercase;
  text-align: center;
`