import { Table } from "react-bootstrap";

import JobRow from './JobRow';

const JobTable = ({ jobapps }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Location</th>
        <th>Title</th>
        <th>Status</th>
        <th>Date Applied</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { jobapps.map( (ja, index) => 
        <JobRow 
          {...ja}
          index={index}
        />
      )}   
    </tbody>
  </Table>
)

export default JobTable;