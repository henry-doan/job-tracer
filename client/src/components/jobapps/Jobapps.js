import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from "./JobForm";
import JobTable from "./JobTable";
import JobStatDisplay from "./JobStatDisplay";
import FlashMessage from "../shared/FlashMessage";
import JobAppPagination from "./Pagination";

const Jobapps = ({ jobapps, getAllJobapps, msgs, setMsgs, totalInterviews, getAllInterviews, getUniqueInterviews, uniqueInterviews, currentPage, getStats, totalPages, counts }) => {
  const [adding, setAdd] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [searchedList, setSearchedList] = useState(jobapps);
  const [searchTerm, setSearchTerm] = useState("");
  const [flash, setFlash] = useState(false);

  useEffect( () => {
    getAllJobapps()
    getAllInterviews()
    getUniqueInterviews()
  }, [])

  useEffect( () => {
    getStats()
  }, [jobapps])

  const jobAppFilter = (filter) => {
    setFilter(filter)
    getAllJobapps(filter, searchTerm, currentPage)
    setSearchedList(jobapps)
  }

  const onPageClick = (page) => {
    getAllJobapps(filter, searchTerm, page)
  }

  const searchjobApp = (e) => {
    setSearchTerm(e.target.value)
    getAllJobapps(filter, searchTerm, currentPage)
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
        totalInterviews={totalInterviews} 
        uniqueInterviews={uniqueInterviews}
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control 
          placeholder="Search By Company" 
          onChange={(e) => searchjobApp(e)}
          name="searchTerm"
          value={searchTerm}
        />
      </Form>
      <Form onSubmit={(e) => filterJobApp(e)}>
        <Form.Group className="mb-3">
          <Form.Select
              onChange={(e) => jobAppFilter(e.target.value)}
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
      { jobapps ? <JobTable jobapps={searchTerm.length > 0 && searchedList.length > 0 ? searchedList : jobapps} /> : <p>No Job Applications</p> }
      <JobAppPagination currentPage={currentPage} totalPages={totalPages} onPageClick={onPageClick} />
   </> 
  )
}

const ConnectedJobapps = (props) => (
  <JobappConsumer>
    { value => <Jobapps {...value} {...props} />}
  </JobappConsumer>
)

export default ConnectedJobapps;