import { useState } from "react";
import { Button, Modal, } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from "./JobForm";

const JobRow = ({ id, desc, status, location, title, address, posting_url, work_hours, date_applied, date_responded, updateJobapp, deleteJobapp, index }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{location}</td>
      <td>{title}</td>
      <td>{status}</td>
      <td>{date_applied}</td>
      <td>
        <Button variant='danger' onClick={(e) => deleteJobapp(id)} className='mx-1'>
          <Icon.Trash />
        </Button>
        <Button variant="warning" onClick={() => setUpdateModalOpen(true)} className='mx-1'>
          <Icon.Pencil />
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

      <Button variant="info" onClick={() => setDetailsOpen(true)} className='mx-1'>
        <Icon.FileText />
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
          className='mx-1'
        >
          <Button>
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