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

function App() {

  return (
    <Router>
      <Header/>
    <Routes>
    <Route path="/" element={<UserPrivateRoute/>}>
    <Route path='home' element={<Home />} />
    <Route path="/pdflecture/:id" element={<PDFSpecificLecture />} />

    </Route>




      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/login' element={<Login />} />


      {/* <Route path='/contact' element={<Contact />} />

      <Route path='/policy' element={<Policy />} />

      <Route path='*' element={<PageNotFound />} /> */}
    </Routes>
  </Router>
  )
}

export default App
