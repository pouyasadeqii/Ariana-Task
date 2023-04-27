import React, { createContext, useReducer } from "react";

export const UserContext = createContext();
const initialState = {
  users: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "add":
      const users = state.users;
      return { users: [...users, action.payload] };
    case "firstTime":
      return action.payload;
    case "update":
      const userss = state.users;
        return { users: [...userss, action.payload] };
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
