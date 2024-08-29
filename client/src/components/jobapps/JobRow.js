import draftToHtml from 'draftjs-to-html';
import { useState } from "react";
import { Button, Form, Modal, } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

import moment from "moment";
import { JobappConsumer } from "../../providers/JobappProvider";
import JobForm from "./JobForm";

const JobRow = ({ id, desc, status, location, title, address, posting_url, work_hours, date_applied, date_responded, updateJobapp, deleteJobapp, index }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClose = () => setDeleteModalOpen(false);
  
  const handleDelete = () => {
    deleteJobapp(id)
    setDeleteModalOpen(false)
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{location}</td>
      <td>{title}</td>
      <td>{status}</td>
      <td>
        {date_applied ? moment.utc(date_applied).format('MM-DD-YYYY') : 'Have Not Applied Yet'}
      </td>
      <td>
        <Button variant='danger' onClick={() => setDeleteModalOpen(true)} className='mx-1'>
          <Icon.Trash />
        </Button>

        <Modal show={deleteModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete? (There is no going back.)</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
          <h2>Job title:{title}</h2>
          <h3>{location}</h3>
          <h3>Status: {status}</h3>
          <h5>Desc:</h5>
          <Form.Control 
            as="textarea" 
            rows={3} 
            readOnly
            value={draftToHtml(JSON.parse(desc))}
          />
          <p><b>Address: </b>{address}</p>
          <p>
            <b>Posting URL: </b>
            <Form.Control 
              as="textarea" 
              rows={2} 
              readOnly
              value={posting_url}
            />
          </p>
          <p><b>Hours: </b>{work_hours}</p>
          <p>
            <b>Date Applied:</b>
            {date_applied ? moment.utc(date_applied).format('MM-DD-YYYY') : 'Have Not Applied Yet'}
          </p>
          <p>
            <b>Date Final Response: </b>
            {date_responded ? moment.utc(date_responded).format('MM-DD-YYYY') : ' No response yet'}
          </p>
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
            <Icon.ChatText />
          </Button>
        </Link>
        <Link
          to={`/${id}/interviews`}
          className='mx-1'
        >
          <Button variant="success">
            <Icon.InfoSquare />
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