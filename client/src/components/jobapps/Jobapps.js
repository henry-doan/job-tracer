import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from './JobForm';
import JobTable from "./JobTable";
import Filter from "./Filter";
import JobStatDisplay from "./JobStatDisplay";
import FlashMessage from "../shared/FlashMessage";

const Jobapps = ({ jobapps, getAllJobapps, msgs, setMsgs, totalInterviews, getAllInterviews, getUniqueInterviews, uniqueInterviews }) => {
  const [adding, setAdd] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [counts, setCounts] = useState({ applied: 0, rejected: 0, pending: 0, offer: 0, hired: 0 });
  const [searchedList, setSearchedList] = useState(jobapps);
  const [searchTerm, setSearchTerm] = useState("");
  const [flash, setFlash] = useState(false);

  useEffect( () => {
    getAllJobapps()
    getAllInterviews()
    getUniqueInterviews()
  }, [])

  useEffect( () => {
    jobappStats()
  }, [jobapps])

  const jobAppFilter = () => {
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

  const searchjobApp = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      let filteredArray = jobapps.filter((jobapp) => 
        jobapp.location.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      setSearchedList(filteredArray)
      if (filteredArray.length === 0) {
        setFlash(true)
      }
    } else {
      setSearchedList([])
    }
  }

  const filterJobApp = (e) => {
    e.preventDefault()
    getAllJobapps(filter)
  }

  return (
   <>
      { flash ?
        <FlashMessage variant='danger' txt='No Search Results' />
        :
        <></>
      }
      <JobStatDisplay 
        counts={counts} 
        total={jobapps.length} 
        totalInterviews={totalInterviews} 
        uniqueInterviews={uniqueInterviews}
      />
      <Form onSubmit={(e) => searchjobApp(e)}>
        <Form.Group className="mb-3">
          <Form.Control 
            placeholder="Search By Company" 
            onChange={(e) => setSearchTerm(e.target.value)}
            name="searchTerm"
            value={searchTerm}
          />
        </Form.Group>
      </Form>
      <Form onSubmit={(e) => filterJobApp(e)}>
        <Form.Group className="mb-3">
          <Form.Select
              onChange={(e) => setFilter(e.target.value)}
              name="filter"
              value={filter}
          >
             { ['All', 'Applied', 'Rejected','Pending', 'Offer', 'Hired'].map( f => 
                <option value={f}>{f}</option>
              )}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={() => setAdd(true)} className='mt-2 mb-3'>
        <Icon.Plus />
      </Button>
      {/* <Filter
        filter={filter}
        setFilter={setFilter}
      /> */}
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
      { jobapps ? <JobTable jobapps={searchTerm.length > 0 && searchedList.length > 0 ? searchedList : jobAppFilter()} /> : <p>No Job Applications</p> }
   </> 
  )
}

const ConnectedJobapps = (props) => (
  <JobappConsumer>
    { value => <Jobapps {...value} {...props} />}
  </JobappConsumer>
)

export default ConnectedJobapps;