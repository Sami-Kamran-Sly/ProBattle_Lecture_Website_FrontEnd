import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react';
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Login from './pages/Auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header'
import UserPrivateRoute from '../Routes/UserPrivateRoute'
import PDFSpecificLecture from '../Lectures/PDFSpecificLecture';
import About from './pages/About';
import AllLectures from '../Lectures/AllLectures';

function App() {

  return (
    <Router>
      <Header/>
    <Routes>
  <Route path="/" element={<UserPrivateRoute/>}>
    <Route path='/home' element={<Home />} />
    <Route path='/getAllLecture' element={<AllLectures/>} />
    <Route path="/pdflecture/:id" element={<PDFSpecificLecture />} />
    <Route path='/about' element={<About />} />

    </Route>




      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/login' element={<Login />} />



    </Routes>
  </Router>
  )
}

export default App
