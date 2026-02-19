import React from 'react'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appointment from './pages/Appointment.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Career from "./pages/Careers.jsx";
import Apply from "./pages/Apply";
 import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from "./components/ScrollToTop";
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
       <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/apply/:role" element={<Apply />} />


      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
