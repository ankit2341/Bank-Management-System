import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Auth";
import Accounts from "../Pages/Accounts";
import Traansactions from "../Pages/Traansactions";
import PrivateRoute from "./PrivateRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}></Route>
      <Route
        path="/transaction"
        element={
          <PrivateRoute>
            <Traansactions />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/accounts"
        element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default MainRoutes;
