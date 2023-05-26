import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LogoutSuccess } from "../Provider/Action";

const NavbarForAll = () => {
  const userdata = useSelector((store) => store.AuthReducer.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Enpointe Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav
            style={{
              color: "#fff",
              display: "flex",
              width: "30%",
              justifyContent: "space-evenly",
            }}
          >
            {userdata == "" ? (
              <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
                Login/Register
              </Link>
            ) : (
              <Link
                onClick={() => {
                  if (window.confirm("Do you really want to logout?")) {
                    alert("logout success");
                    dispatch(LogoutSuccess());
                    navigate("/");
                    window.location.reload();
                  }
                }}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {userdata.username}
              </Link>
            )}
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to="/accounts"
            >
              Accounts
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to="/transaction"
            >
              Transactions
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarForAll;
