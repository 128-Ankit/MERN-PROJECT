import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './conponets/Navbar';
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Footer } from "./conponets/footer/Footer";
import { Error } from "./pages/Error";
import { AdminLayout } from './conponets/layouts/Admin-layout';
import{AdminUsers} from './pages/Admin-Users';
import{AdminContacts} from './pages/Admin-Contacts';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          {/* <Route path="users/:id/edit" element={<AdminUpdate />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
