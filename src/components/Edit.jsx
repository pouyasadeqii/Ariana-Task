import React, { useContext, useEffect, useState } from "react";
import { Button, ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../context/UsersDataContext";

const Edit = ({ id }) => {
  const { state, dispatch } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    lastName: "",
    dateOfBirthDay: "",
    skills: [],
  });

  // selected user=========================
  const selectedUser = state.users.find((user) => user.id === id);

  const [skills, setSkills] = useState({
    javascript: false,
    next: false,
    html: false,
    react: false,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getSkills();
    setUpdatedUser(selectedUser);
  };

  const getSkills = () => {
    let skill = { ...skills };
    for (let i of selectedUser.skills) {
      skill = { ...skill, [i]: true };
    }
    setSkills({ ...skills, ...skill });
  };

  const changeHandler = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const checkedHandler = (e) => {
    if (e.target.checked) {
      setSkills({ ...skills, [e.target.name]: true });
    }

    if (!e.target.checked) {
      const userSkills = { ...skills };
      userSkills[e.target.name] = !userSkills[e.target.name];
      setSkills(userSkills);
      const allSkills = updatedUser.skills;
    }
  };

  const dispatchHandler = () => {
    const newData = state.users.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedUser,
          skills: Object.keys(skills).filter((key) => skills[key] === true),
        };
      } else return item;
    });

    dispatch({
      type: "edit",
      payload: newData,
    });
    if (localStorage.getItem("data")) {
      const users = JSON.parse(localStorage.getItem("data"));
      // console.log(...users.users);
      localStorage.setItem(
        "data",
        JSON.stringify({
          users: newData,
        })
      );
      handleClose();
      return;
    }
  };

  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        ویرایش
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>کاربر جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="name">نام</label>
            <input
              className="px-3 py-2"
              type="text"
              name="name"
              onChange={changeHandler}
              value={updatedUser.name}
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="lastName"> نام خانوادگی</label>
            <input
              className="px-3 py-2"
              type="text"
              name="lastName"
              onChange={changeHandler}
              value={updatedUser.lastName}
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="dateOfBirthDay"> تاریخ تولد</label>
            <input
              className="px-3 py-2"
              type="date"
              name="dateOfBirthDay"
              onChange={changeHandler}
              value={updatedUser.dateOfBirthDay}
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor=""> مهارت ها</label>
            <div className="d-flex gap-4">
              <div className="d-flex gap-2">
                <label htmlFor="html"> HTML</label>
                <input
                  type="checkbox"
                  name="html"
                  id="html"
                  onChange={checkedHandler}
                  checked={skills.html}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="javascript"> javascript</label>
                <input
                  type="checkbox"
                  name="javascript"
                  id="javascript"
                  onChange={checkedHandler}
                  checked={skills.javascript}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="react"> react</label>
                <input
                  type="checkbox"
                  name="react"
                  id="react"
                  onChange={checkedHandler}
                  checked={skills.react}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="next"> next</label>
                <input
                  type="checkbox"
                  name="next"
                  id="next"
                  onChange={checkedHandler}
                  checked={skills.next}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button variant="warning" onClick={dispatchHandler}>
            ویرایش
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            بازگشت
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Edit;
