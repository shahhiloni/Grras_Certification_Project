import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgetPassword from './Authentication/ForgetPassword'
import Login from './Authentication/login'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login />} /> 
 <Route path="/forget-password" element={<ForgetPassword />} />
  
   </Routes>
   </BrowserRouter>
  )
}

export default App
