import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from './JobForm';
import JobTable from "./JobTable";
import Filter from "./Filter";

const Jobapps = ({ jobapps, getAllJobapps, msgs, setMsgs  }) => {
  const [adding, setAdd] = useState(false)
  const [filter, setFilter] = useState("ALL")

  useEffect( () => {
    getAllJobapps()
  }, [])

  const JobAppFilter = () => {
    switch(filter) {
      case 'Applied':
        return jobapps.filter( t => t.status === "Applied")
      case 'Rejected':
        return jobapps.filter( t => t.status === "Rejected")
      case 'Pending':
        return jobapps.filter( t => t.status === "Pending")
      case 'Offer':
        return jobapps.filter( t => t.status === "Offer")
      case 'Hired':
        return jobapps.filter( t => t.status === "Hired")
      default: 
        return jobapps
    }
  }

  return (
   <>
      <Button variant="primary" onClick={() => setAdd(true)} className='mt-2 mb-3'>
        <Icon.Plus />
      </Button>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
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
      { jobapps ? <JobTable jobapps={JobAppFilter()} /> : <p>No Job Applications</p> }
   </> 
  )
}

const ConnectedJobapps = (props) => (
  <JobappConsumer>
    { value => <Jobapps {...value} {...props} />}
  </JobappConsumer>
)

export default ConnectedJobapps;