import { AuthConsumer } from "../../providers/AuthProvider";

import { Link } from 'react-router-dom';

const Navbar = ({user, handleLogout }) => {

  const rightNavItems = () => {
    if (user) {
      return (
        <>
          <li onClick={ () => handleLogout() }>
            Logout
          </li>
        </>
      )
    } else {
      return (
        <>
          <Link to='/login'>
            <li>
              Login
            </li>
          </Link>
          <Link to='/register'>
            <li>
              Register

            </li>

          </Link>

        </>

      )

    }

  }

  return (
    <>
      <nav>
        <ul>
          <Link to='/'>
            <li>
              Home
            </li>
          </Link>
            { rightNavItems() }
        </ul>
      </nav>
    </>
  )
}

const ConnectedNavbar = (props) => (
  <AuthConsumer> 
    { value => <Navbar { ...props } { ...value } /> }
  </AuthConsumer>
)

export default ConnectedNavbar;