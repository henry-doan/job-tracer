import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { NoteConsumer } from "../../providers/NoteProvider";
import NoteForm from './NoteForm';
import NoteList from "./NoteList";

const Notes = ({ notes, getAllNotes, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)
  const { jobappid } = useParams()

  useEffect( () => {
    getAllNotes(jobappid)
  }, [])

  return (
    <Container>
      <Button variant="primary" onClick={() => setAdd(true)}>
        Add Note
      </Button>

      <Modal show={adding} onHide={() => setAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NoteForm 
            setAdd={setAdd}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAdd(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Notes</h1>
      { notes ? <NoteList notes={notes} /> : <p>No Notes</p> }
    </Container> 
  )
}

const ConnectedNotes= (props) => (
  <NoteConsumer>
    { value => <Notes {...value} {...props} />}
  </NoteConsumer>
)

export default ConnectedNotes;