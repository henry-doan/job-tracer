import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { AuthConsumer } from "../../providers/AuthProvider";


const MainNavbar = ({user, handleLogout }) => {

  const rightNavItems = () => {
    if (user) {
      return (
        <Nav>
          <Nav.Link onClick={ () => handleLogout() }>
            Logout
          </Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <Link to='/login' className="nav-link">
            Login
          </Link>
          <Link to='/register' className="nav-link">
            Register
          </Link>
        </Nav>
      )
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Job Tracer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            { rightNavItems() }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

const ConnectedNavbar = (props) => (
  <AuthConsumer> 
    { value => <MainNavbar { ...props } { ...value } /> }
  </AuthConsumer>
)

export default ConnectedNavbar;