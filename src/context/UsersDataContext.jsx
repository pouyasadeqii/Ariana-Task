import React, { createContext, useReducer } from "react";

export const UserContext = createContext();
const initialState = {
  name: "",
  userName: "",
  dateOfBirthDay: "",
  skills: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { state, log: "hollo" };

    default:
      return state;
  }
};

const UsersDataContext = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UsersDataContext;
