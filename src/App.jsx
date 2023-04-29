import React from "react";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import UsersDataContext from "./context/UsersDataContext";
import { Routes ,Route , Navigate} from "react-router-dom"

import Home from "./components/Home";
import Chart from "./components/Chart";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import Header from "./components/Header";

const App = () => {
  return (
    <UsersDataContext>
      <Header />
      {/* <Home />
      <Chart /> */}
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </UsersDataContext>
  );
};

export default App;
