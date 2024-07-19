import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup, ListGroup, Modal } from "semantic-ui-react";

import { NoteConsumer } from "../../providers/NoteProvider";
import NoteForm from "./NoteForm";

const NoteItem = ({ id, subject, body, updateNote, deleteNote }) => {
  const [open, setUpdateModalOpen] = useState(false)
  const { jobappid } = useParams()

  return (
    <ListGroup.Item>
      <h4>{subject}</h4>
      <p>{body}</p>
      <ButtonGroup>
        <Button variant="warning" onClick={() => setUpdateModalOpen(true)}>
          Edit
        </Button>

        <Modal show={open} onHide={() => setUpdateModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NoteForm 
              id={id}
              subject={subject}
              body={body}
              updateNote={updateNote}
              setUpdateModalOpen={setUpdateModalOpen}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdateModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="danger" onClick={(e) => deleteNote(jobappid, id)}>Delete</Button>
      </ButtonGroup>
    </ListGroup.Item>
  )
}

const ConnectedNoteItem = (props) => (
  <NoteConsumer>
    { value => <NoteItem {...value} {...props} />}
  </NoteConsumer>
)

export default ConnectedNoteItem;