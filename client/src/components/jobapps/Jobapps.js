import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from './JobForm';
import JobTable from "./JobTable";

const Jobapps = ({ jobapps, getAllJobapps, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)

  useEffect( () => {
    getAllJobapps()
  }, [])

  return (
   <>
      <Button variant="primary" onClick={() => setAdd(true)}>
        +
      </Button>
      <Modal show={adding} onHide={() => setAdd(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Job Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobForm 
            setAdd={setAdd}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAdd(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      { jobapps ? <JobTable jobapps={jobapps} /> : <p>No Job Applications</p> }
   </> 
  )
}

const ConnectedJobapps = (props) => (
  <JobappConsumer>
    { value => <Jobapps {...value} {...props} />}
  </JobappConsumer>
)

export default ConnectedJobapps;