import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from './JobForm';
import JobTable from "./JobTable";
import Filter from "./Filter";
import JobStatDisplay from "./JobStatDisplay";

const Jobapps = ({ jobapps, getAllJobapps, msgs, setMsgs, }) => {
  const [adding, setAdd] = useState(false)
  const [filter, setFilter] = useState("ALL")
  const [counts, setCounts] = useState({ applied: 0, rejected: 0, pending: 0, offer: 0, hired: 0 })

  useEffect( () => {
    getAllJobapps()
  }, [])

  useEffect( () => {
    jobappStats()
  }, [jobapps])

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

  const jobappStats = () => {
    let counts = { applied: 0, rejected: 0, pending: 0, offer: 0, hired: 0 }
    jobapps.map( ja => {
      switch(ja.status) {
        case 'Applied':
          counts = {...counts, applied: counts.applied + 1}
          break
        case 'Rejected':
          counts = {...counts, rejected: counts.rejected + 1}
          break
        case 'Pending':
          counts = {...counts, pending: counts.pending + 1}
          break
        case 'Offer':
          counts = {...counts, offer: counts.offer + 1}
          break
        case 'Hired':
          counts = {...counts, hired: counts.hired + 1}
          break
        default:
          break
      }
    })
    return setCounts(counts)
  }

  return (
   <>
      <JobStatDisplay counts={counts} />
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