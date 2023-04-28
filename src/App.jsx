import React from "react";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import UsersDataContext from "./context/UsersDataContext";

import Home from "./components/Home";
import Chart from "./components/Chart";

const App = () => {
  return (
    <UsersDataContext>
      <Home />
      <Chart />
    </UsersDataContext>
  );
};

export default App;
