import React from "react";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import UsersDataContext from "./context/UsersDataContext";

import Home from "./components/Home";

const App = () => {
  return (
    <UsersDataContext>
      <Home />
    </UsersDataContext>
  );
};

export default App;
