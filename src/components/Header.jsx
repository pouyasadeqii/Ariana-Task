import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const style = {
    textDecoration: "none",
    padding: "5px 10px",
    backgroundColor: "#7F9183",
    color: "#fff",
    borderRadius: "5px",
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto d-flex gap-3">
            <Link to="/" style={style}>
              خانه
            </Link>
            <Link to="/create-user" style={style}>
              ایجاد کاربر
            </Link>
            <Link to="/users" style={style}>
              کاربران
            </Link>
            <Link to="/chart" style={style}>
              نمودار
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
