import React from 'react'
import {Routes,Route} from "react-router-dom";
import Auth from '../Pages/Auth';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/transaction'></Route>
        <Route path='/accounts'></Route>
    </Routes>
  )
}

export default MainRoutes