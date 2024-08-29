import { ListGroup } from "react-bootstrap";

import InterviewItem from "./InterviewItem";

const InterviewList = ({ interviews}) => (
  <ListGroup>
    { interviews.map( n => 
      <InterviewItem
        {...n}
      />
    )}   
  </ListGroup>
)

export default InterviewList;