import { ListGroup } from "react-bootstrap";
import { SelectedListGroupItem, UnselectedListGroupItem } from "../styles.js/mainstyles";

const filterLink = (current, name, setFilter) => {
  if (current === name)
    return <SelectedListGroupItem key={name}>{name}</SelectedListGroupItem>
  else 
    return <UnselectedListGroupItem
            key={name}
            onClick={ () => setFilter(name)}
           >
              {name}
          </UnselectedListGroupItem>
}

const Filter = ({ filter, setFilter }) => (
  <ListGroup horizontal>
    { ['All', 'Applied', 'Rejected','Pending', 'Offer', 'Hired'].map( f => 
      filterLink( filter, f, setFilter)
    )}
  </ListGroup>
)
  
export default Filter;