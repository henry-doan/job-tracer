import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { NoteConsumer } from '../../providers/NoteProvider';
import { useParams } from 'react-router-dom';

const NoteForm = ({ setAdd, addNote, updateNote, id, subject, body, setUpdateModalOpen }) => {
  const [note, setNote] = useState({ subject: '', body: '' })
  const { jobappid } = useParams()

  useEffect( () => {
    if (id) {
      setNote({ subject, body })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateNote(jobappid, id, note)
      setUpdateModalOpen(false)
    } else {
      addNote(jobappid, note)
      setAdd(false)
    }
    setNote({ subject: '', body: '' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control 
            name='subject'
            value={note.subject}
            onChange={(e) => setNote({ ...note, subject: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control 
            name='subject'
            value={note.subject}
            onChange={(e) => setNote({ ...note, subject: e.target.value })}
            required
          />
          <Form.Control 
            as="textarea" 
            rows={3} 
            name='body'
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

const ConnectedNoteForm = (props) => (
  <NoteConsumer>
    { value => <NoteForm {...props} {...value} />}
  </NoteConsumer>
)

export default ConnectedNoteForm;