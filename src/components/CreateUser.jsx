import React, { useContext, useState } from "react";
import { Button, ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../context/UsersDataContext";

const CreateUser = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    dateOfBirthDay: "",
    skills: [],
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setData({
      name: "",
      lastName: "",
      dateOfBirthDay: "",
      skills: [],
    });
  };
  const handleShow = () => setShow(true);

  const getId = () => {
    if (state.users.length === 0) {
      return 1;
    } else {
      const selectedUser = state.users[state.users.length - 1];
      const id = Number(selectedUser.id) + 1;
      return id;
    }
  };

  const changeHandler = (e) => {
    if (e.target.checked) {
      const skills = data.skills;
      setData({
        ...data,
        skills: [...skills, e.target.name],
        id: getId(),
      });
      return;
    }
    // if (!e.target.checked) {
    //   const skills = data.skills.map((skill) => skill !== e.target.value);
    //   setData({
    //     ...data,
    //     skills: [...skills],
    //     id: getId(),
    //   });
    //   return;
    // }
    setData({
      ...data,
      [e.target.name]: e.target.value,
      id: getId(),
    });
  };

  const dispatchHandler = () => {
    // setData({ ...data, id: getId() });
    if (
      data.dateOfBirthDay &&
      data.lastName &&
      data.name &&
      data.skills.length
    ) {
      dispatch({ type: "add", payload: data });
      if (localStorage.getItem("data")) {
        const users = JSON.parse(localStorage.getItem("data"));
        // console.log(...users.users);
        localStorage.setItem(
          "data",
          JSON.stringify({ users: [...users.users, data] })
        );
        handleClose();
        return;
      } else {
        localStorage.setItem("data", JSON.stringify({ users: [data] }));
      }
      setData({
        name: "",
        lastName: "",
        dateOfBirthDay: "",
        skills: [],
      });
    }
    handleClose();
    console.log(data);
  };

  // console.log(state);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        alignItems: "center",
        gap:"1rem"
      }}
    >
      <h1>برای ایجاد کاربر جدید کلیک کنید</h1>
      <Button variant="primary" onClick={handleShow}>
        کاربر جدید
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
              required
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="lastName"> نام خانوادگی</label>
            <input
              className="px-3 py-2"
              type="text"
              name="lastName"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="dateOfBirthDay"> تاریخ تولد</label>
            <input
              className="px-3 py-2"
              type="date"
              name="dateOfBirthDay"
              onChange={changeHandler}
              required
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
                  onChange={changeHandler}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="javascript"> javascript</label>
                <input
                  type="checkbox"
                  name="javascript"
                  id="javascript"
                  onChange={changeHandler}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="react"> react</label>
                <input
                  type="checkbox"
                  name="react"
                  id="react"
                  onChange={changeHandler}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="next"> next</label>
                <input
                  type="checkbox"
                  name="next"
                  id="next"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button variant="success" onClick={dispatchHandler}>
            ایجاد کاربر
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            بازگشت
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateUser;
