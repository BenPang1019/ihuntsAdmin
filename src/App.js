import './App.css';
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

import {AdminLogin} from "./Pages/Admin/AdminLogin";
import {Admin} from "./Pages/Admin/Admin";
import {AdminProduct} from "./Pages/Admin/AdminProduct";

import { UpdateProduct } from "./Pages/Admin/UpdateEvent";
import { ViewProduct } from "./Pages/Admin/ViewProduct";
import { AdminNews } from './Pages/Admin/AdminNews';
import { AddGuide } from './Pages/Admin/AddGuide';
import { UpdateGuide } from './Pages/Admin/UpdateGuide';
import { ViewGuide } from './Pages/Admin/ViewGuide';
import { AddEvent } from './Pages/Admin/AddEvent';
import { Media } from './Pages/Admin/Media';
import { RegisterUser} from './Pages/Admin/RegisterUser';
import { RegisterUserDetails } from './Pages/Admin/RegisterUserDetails';
import { AdminQuestion } from './Pages/Admin/AdminQuestion';
import { AddQuestion } from './Pages/Admin/AddQuestion';
import { UpdateQuestion } from './Pages/Admin/UpdateQuestion';
import { ViewQuestion } from './Pages/Admin/ViewQuestion';

function App() {
  return (
    <Router >
     <Routes>
        <Route path="/"  element={<AdminLogin/>} />
        <Route path="/adminMainPage"  element={<Admin/>} />

        <Route path="/adminProduct"  element={<AdminProduct/>} />
        <Route path="/addEvent"  element={<AddEvent/>} />
        <Route path="/updateEvent"  element={<UpdateProduct/>} />
        <Route path="/viewEvent"  element={<ViewProduct/>} />

        <Route path="/adminGuide"  element={<AdminNews/>} />
        <Route path="/addGuide"  element={<AddGuide/>} />
        <Route path="/updateGuide"  element={<UpdateGuide/>} />
        <Route path="/viewGuide"  element={<ViewGuide/>} />

        <Route path="/media"  element={<Media/>} />

        <Route path="/adminQuestion"  element={<AdminQuestion/>} />
        <Route path="/addQuestion"  element={<AddQuestion/>} />
        <Route path="/updateQuestion"  element={<UpdateQuestion/>} />
        <Route path="/viewQuestion"  element={<ViewQuestion/>} />

        <Route path="/registerUser"  element={<RegisterUser/>} />
        <Route path="/registerUserDetails"  element={<RegisterUserDetails/>} />
     </Routes>
    </Router>
  );
}

export default App;

