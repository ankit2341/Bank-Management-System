import React from 'react'
import {Routes,Route} from "react-router-dom";
import Auth from '../Pages/Auth';
import Accounts from '../Pages/Accounts';
import Traansactions from '../Pages/Traansactions';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/transaction' element={<Traansactions/>}></Route>
        <Route path='/accounts' element={<Accounts/>}></Route>
    </Routes>
  )
}

export default MainRoutes