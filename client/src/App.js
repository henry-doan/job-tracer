import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import FetchUser from './components/auth/FetchUser';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/Register';
import Dash from './components/shared/Dash';
import Home from './components/shared/Home';
import MainNavbar from './components/shared/MainNavbar';
import NoMatch from './components/shared/NoMatch';
import Notes from './components/notes/Notes';
import Interviews from './components/interviews/Interviews';

const App = () => (
  <>
    <MainNavbar />
    <Container>
      <FetchUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/dash' element={<Dash />} />
            <Route path='/:jobappid/notes' element={<Notes />} />
            <Route path='/:jobappid/interviews' element={<Interviews />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </FetchUser>
    </Container>
  </>
)

export default App;