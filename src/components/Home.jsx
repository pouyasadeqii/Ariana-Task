import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { UserContext } from "../context/UsersDataContext";
import Edit from "./Edit";
import Delete from "./Delete";
import { Link } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      dispatch({ type: "firstTime", payload: data });
    }
  }, []);
  //   console.log(users);

  return (
    <Container className="my-5">
      <h1 className="text-center">
        خوش آمدید برای ایجاد کاربر به صفحه{" "}
        <Link to="/create-user">ایجاد کاربر</Link> بروید
      </h1>
    </Container>
  );
};

export default Home;
