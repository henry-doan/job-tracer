import { convertToRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';

import { JobappConsumer } from '../../providers/JobappProvider';


const JobForm = ({ setAdd, addJobapp, updateJobapp, id, desc, status, location, title, address, posting_url, work_hours, date_applied, date_responded, setUpdateModalOpen }) => {
  const [jobapp, setJobapp] = useState({ desc: '', status: 'Applied', location: '', title: '', address: '', posting_url: '', work_hours: '', date_applied: '', date_responded: '' })
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect( () => {
    if (id) {
      setJobapp({ desc, status, location, title, address, posting_url, work_hours, date_applied, date_responded })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );

    if (id) {
      updateJobapp(id, jobapp)
      setUpdateModalOpen(false)
    } else {
      addJobapp({...jobapp, desc: content})
      setAdd(false)
    }
    setJobapp({ desc: '', status: '', location: '', title: '', address: '', posting_url: '', work_hours: '', date_applied: '', date_responded: '' })
  }

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job title</Form.Label>
          <Form.Control 
            required         
            name='title'
            value={jobapp.title}
            onChange={(e) => setJobapp({ ...jobapp, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Where At?</Form.Label>
          <Form.Control 
            required         
            name='location'
            value={jobapp.location}
            onChange={(e) => setJobapp({ ...jobapp, location: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select 
            name='status'
            value={jobapp.status}
            onChange={(e) => setJobapp({ ...jobapp, status: e.target.value })}
          >
            <option>Status</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            name='address'
            value={jobapp.address}
            onChange={(e) => setJobapp({ ...jobapp, address: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Posting URL</Form.Label>
          <Form.Control 
            required         
            name='posting_url'
            value={jobapp.posting_url}
            onChange={(e) => setJobapp({ ...jobapp, posting_url: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hours</Form.Label>
          <Form.Control          
            name='work_hours'
            value={jobapp.work_hours}
            onChange={(e) => setJobapp({ ...jobapp, work_hours: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date Applied</Form.Label>
          <Form.Control 
            type='date'
            name='date_applied'
            value={jobapp.date_applied}
            onChange={(e) => setJobapp({ ...jobapp, date_applied: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date Answer Responsed</Form.Label>
          <Form.Control 
            type='date'
            name='date_responded'
            value={jobapp.date_responded}
            onChange={(e) => setJobapp({ ...jobapp, date_responded: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

const ConnectedJobForm = (props) => (
  <JobappConsumer>
    { value => <JobForm {...props} {...value} />}
  </JobappConsumer>
)

export default ConnectedJobForm;