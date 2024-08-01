import { Container, Row } from "react-bootstrap";

const styles = {
  link: { 
    cursor: 'pointer', 
    textDecoration: 'underline', 
    color: 'blue',
    marginLeft: '5px',
    marginRight: '5px',
  }
}

const filterLink = (current, name, setFilter) => {
  if (current === name)
    return <span key={name}>{name}</span>
  else 
    return <span key={name}
    style={styles.link}
    onClick={ () => setFilter(name)}>{name}</span>
}

const Filter = ({ filter, setFilter }) => (
  <Container>
    <h3>Sort By</h3>
    <Row>
      <h4>Status</h4>
      { ['All', 'Applied', 'Rejected','Pending', 'Offer', 'Hired'].map( f => 
        filterLink( filter, f, setFilter)
      )}
    </Row>
  </Container>
)
  
export default Filter;