import { Col, Row } from "react-bootstrap";
import SingleStat from "./SingleStat";

const JobStatDisplay = ({ counts }) => (
  <>
    <Row>
      <Col>
        <SingleStat 
          counts={counts.applied}
          label='Applied'
          txtcolor='#0dcaf0'
        />
      </Col>
      <Col>
        <SingleStat 
          counts={counts.rejected}
          label='Rejected'
          txtcolor='#dc3545'
        />
      </Col>
      <Col>
        <SingleStat 
          counts={counts.pending}
          label='Pending'
          txtcolor='#ffc107'
        />
      </Col>
      <Col>
        <SingleStat 
          counts={counts.offer}
          label='Offer'
          txtcolor='#0d6efd'
        />
      </Col>
      <Col>
        <SingleStat 
          counts={counts.hired}
          label='Hired'
          txtcolor='#198754'
        />
      </Col>
    </Row>
  </>
)

export default JobStatDisplay;