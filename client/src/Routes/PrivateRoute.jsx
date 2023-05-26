import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userdata = useSelector((store) => store.AuthReducer.userData);
  const navigate=useNavigate();

  if (userdata === "") {
    alert("Login first");
    navigate("/")
  }
  return children;
}
export default PrivateRoute;
