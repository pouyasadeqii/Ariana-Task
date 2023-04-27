import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../context/UsersDataContext";

const Delete = ({ id }) => {
  const { state, dispatch } = useContext(UserContext);

  const deleteHandler = () => {
    const selectedUser = state.users.filter((user) => user.id !== id);
    dispatch({ type: "update", payload: selectedUser });
    const users = JSON.parse(localStorage.getItem("data"));
    console.log(users.users);
    const selectedUserLocal = users.users.filter((user) => user.id !== id);
    localStorage.setItem(
      "data",
      JSON.stringify({ users: [...selectedUserLocal] })
    );
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
