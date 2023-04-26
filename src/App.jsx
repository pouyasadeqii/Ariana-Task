import React, { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import UsersDataContext from "./context/UsersDataContext";
import { UserContext } from "./context/UsersDataContext";
import ModalComponent from "./components/ModalComponent";

const App = () => {

  return (
    <UsersDataContext>
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
        <ModalComponent />
      </Container>
    </UsersDataContext>
  );
};

export default App;
