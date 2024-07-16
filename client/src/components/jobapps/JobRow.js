import { useState } from "react";
import { Button, Modal, } from "react-bootstrap";
import { Link } from "react-router-dom";

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from "./JobForm";

const JobRow = ({ id, desc, status, location, title, address, posting_url, work_hours, date_applied, date_responded, updateJobapp, deleteJobapp }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <tr>
      <td>{id}</td>
      <td>{location}</td>
      <td>{title}</td>
      <td>{status}</td>
      <td>{date_applied}</td>
      <td>
        <Button color='red' onClick={(e) => deleteJobapp(id)}>
          Delete
        </Button>
        <Button variant="primary" onClick={() => setUpdateModalOpen(true)}>
          Update
        </Button>
        <Modal show={updateModalOpen} onHide={() => setUpdateModalOpen(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobForm 
              setUpdateModalOpen={setUpdateModalOpen}
              id={id}
              desc={desc}
              status={status}
              location={location}
              title={title}
              address={address}
              posting_url={posting_url}
              work_hours={work_hours}
              date_applied={date_applied}
              date_responded={date_responded}
              updateJobapp={updateJobapp}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdateModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      <Button variant="primary" onClick={() => setDetailsOpen(true)}>
        More Info
      </Button>
      <Modal show={detailsOpen} onHide={() => setDetailsOpen(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{location}</h1>
          <h2>Job title:{title}</h2>
          <h3>Status: {status}</h3>
          <p>{desc}</p>
          <p>Address: {address}</p>
          <p>Posting URL:{posting_url}</p>
          <p>Hours:{work_hours}</p>
          <p>Date Applied:{date_applied}</p>
          <p>Date Final Response:{date_responded}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Link
          to={`/${id}/notes`}
        >
          <Button icon color='green'>
            Notes
          </Button>
        </Link>
      </td>
    </tr>
  )
} 

const ConnectedJobRow = (props) => (
  <JobappConsumer>
    { value => <JobRow {...value} {...props} />}
  </JobappConsumer>
)

export default ConnectedJobRow;