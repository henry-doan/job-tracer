import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { InterviewConsumer } from "../../providers/InterviewProvider";
import InterviewForm from './InterviewForm';
import InterviewList from "./InterviewList";

const Interviews = ({ interviews, getAllInterviews, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)
  const { jobappid } = useParams()

  useEffect( () => {
    getAllInterviews(jobappid)
  }, [])

  return (
    <Container>
      <Button variant="primary" onClick={() => setAdd(true)} className='mt-2 mb-3'>
        Add Interview / Assessment
      </Button>

      <Modal show={adding} onHide={() => setAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Interview / Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InterviewForm 
            setAdd={setAdd}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAdd(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Interviews</h1>
      { interviews ? <InterviewList interviews={interviews} /> : <p>No Interviews</p> }
    </Container> 
  )
}

const ConnectedInterviews= (props) => (
  <InterviewConsumer>
    { value => <Interviews {...value} {...props} />}
  </InterviewConsumer>
)

export default ConnectedInterviews;