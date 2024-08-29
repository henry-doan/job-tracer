import moment from "moment";
import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { InterviewConsumer } from "../../providers/InterviewProvider";
import InterviewForm from "./InterviewForm";

const InterviewItem = ({ id, stage, when, updateInterview, deleteInterview }) => {
  const [open, setUpdateModalOpen] = useState(false)
  const { jobappid } = useParams()

  return (
    <ListGroup.Item>
      <h4>{stage}</h4>
      <p>{when ? moment.utc(when).format('MM-DD-YYYY') : 'Have Not Done Yet'}</p>

      <Button variant="warning" onClick={() => setUpdateModalOpen(true)} className='mx-2'>
        Edit
      </Button>

      <Modal show={open} onHide={() => setUpdateModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Interview Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InterviewForm 
            id={id}
            stage={stage}
            body={when}
            updateInterview={updateInterview}
            setUpdateModalOpen={setUpdateModalOpen}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUpdateModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="danger" onClick={(e) => deleteInterview(jobappid, id)} className='mx-2'>Delete</Button>
    </ListGroup.Item>
  )
}

const ConnectedInterviewItem = (props) => (
  <InterviewConsumer>
    { value => <InterviewItem {...value} {...props} />}
  </InterviewConsumer>
)

export default ConnectedInterviewItem;