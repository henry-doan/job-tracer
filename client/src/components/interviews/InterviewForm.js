import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import { InterviewConsumer } from '../../providers/InterviewProvider';

const InterviewForm = ({ setAdd, addInterview, updateInterview, id, stage, when, setUpdateModalOpen }) => {
  const [interview, setInterview] = useState({ stage: '', when: '' })
  const { jobappid } = useParams()

  useEffect( () => {
    if (id) {
      setInterview({ stage, when })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateInterview(jobappid, id, interview)
      setUpdateModalOpen(false)
    } else {
      addInterview(jobappid, interview)
      setAdd(false)
    }
    setInterview({ stage: '', when: '' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Stage</Form.Label>
          <Form.Control 
            name='stage'
            value={interview.stage}
            onChange={(e) => setInterview({ ...interview, stage: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>When</Form.Label>
          <Form.Control 
            type='date'
            name='when'
            value={interview.when}
            onChange={(e) => setInterview({ ...interview, when: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

const ConnectedInterviewForm = (props) => (
  <InterviewConsumer>
    { value => <InterviewForm {...props} {...value} />}
  </InterviewConsumer>
)

export default ConnectedInterviewForm;