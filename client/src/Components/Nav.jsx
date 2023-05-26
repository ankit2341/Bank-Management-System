import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarForAll = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Enpointe Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav style={{color:"#fff",display:"flex",width:"30%",justifyContent:"space-evenly"}}>
          <Link style={{textDecoration:"none",color:"#fff"}} to="/">Login/Register</Link>
          <Link style={{textDecoration:"none",color:"#fff"}}  to="/accounts">
            Accounts
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarForAll