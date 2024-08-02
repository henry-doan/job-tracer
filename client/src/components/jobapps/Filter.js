import { ListGroup } from "react-bootstrap";

const styles = {
  selected: { 
    textDecoration: 'underline #0d6efd', 
    fontWeight: 'bold',
  },
  unselected: { 
    cursor: 'pointer', 
  },
}

const filterLink = (current, name, setFilter) => {
  if (current === name)
    return <ListGroup.Item style={styles.selected} key={name}>{name}</ListGroup.Item>
  else 
    return <ListGroup.Item 
            key={name}
            onClick={ () => setFilter(name)}
            style={styles.unselected} 
           >
              {name}
          </ListGroup.Item>
}

const Filter = ({ filter, setFilter }) => (
  <ListGroup horizontal>
    { ['All', 'Applied', 'Rejected','Pending', 'Offer', 'Hired'].map( f => 
      filterLink( filter, f, setFilter)
    )}
  </ListGroup>
)
  
export default Filter;