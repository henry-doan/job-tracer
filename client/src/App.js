import Home from './components/shared/Home';
import NoMatch from './components/shared/NoMatch';
import MainNavbar from './components/shared/MainNavbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FetchUser from './components/auth/FetchUser';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const App = () => (
  <>
    <MainNavbar />
    <Container>
      <FetchUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </FetchUser>
    </Container>
  </>
)

export default App;