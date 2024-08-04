import { Col, Row } from "react-bootstrap";

const JobStatDisplay = ({ counts }) => (
  <>
    <Row>
      <Col>Applied: {counts.applied}</Col>
      <Col>Rejected: {counts.rejected}</Col>
      <Col>Pending: {counts.pending}</Col>
      <Col>Offer: {counts.offer}</Col>
      <Col>Hired: {counts.hired}</Col>
    </Row>
  </>
)

export default JobStatDisplay;