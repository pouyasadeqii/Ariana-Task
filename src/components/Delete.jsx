import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../context/UsersDataContext";

const Delete = ({ id }) => {
  const { state, dispatch } = useContext(UserContext);

  const deleteHandler = () => {
    // const changeId = [...state.users];
    // for (let i = id; i < state.users.length; i++) {
    //   changeId[i].id -= 1;
    // }

    const selectedUser = state.users.filter((user) => user.id !== id);
    
    console.log(selectedUser);
    dispatch({ type: "delete", payload: selectedUser });
    const users = JSON.parse(localStorage.getItem("data"));
    console.log(users.users);
    localStorage.setItem("data", JSON.stringify({ users: [...selectedUser] }));
  };

  return (
    <div>
      <Button variant="danger" onClick={deleteHandler}>
        حذف
      </Button>
    </div>
  );
};

export default Delete;
