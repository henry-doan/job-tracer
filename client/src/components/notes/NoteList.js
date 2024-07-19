import { ListGroup } from "react-bootstrap";

import NoteItem from "./NoteItem";

const NoteList = ({ notes}) => (
  <ListGroup>
    { notes.map( n => 
      <NoteItem
        {...n}
      />
    )}   
  </ListGroup>
)

export default NoteList;