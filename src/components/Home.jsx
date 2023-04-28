import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { UserContext } from "../context/UsersDataContext";
import Edit from "./Edit";
import Delete from "./Delete";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const len = state.users.length;

  useEffect(() => {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      dispatch({ type: "firstTime", payload: data });
    }
  }, []);
  //   console.log(users);

  return (
    <Container className="my-5">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>سن</th>
            <th>مهارت ها</th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{2023 - user.dateOfBirthDay.slice(0, 4)}</td>
                <td>{user.skills.map((skill) => `${skill} `)}</td>
                <td>
                  <Edit id={user.id} />
                </td>
                <td>
                  <Delete id={user.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalComponent />
    </Container>
  );
};

export default Home;
