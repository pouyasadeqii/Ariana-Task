import React, { useContext, useEffect, useState } from "react";
import { Button, ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../context/UsersDataContext";

const Edit = ({ id }) => {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    dateOfBirthDay: "",
    skills: [],
  });
  const [skills, setSkills] = useState({});

  const selectedUser = state.users.find((user) => user.id === id);
  console.log(selectedUser);

  const getSkills = () => {
    // const skills= selectedUser.skills.map(skill => skill)
    let skill = {};
    for (let i of selectedUser.skills) {
      skill = { ...skill, [i]: true };
    }
    console.log(skill);
    setSkills(skill);
    // return skill;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (e) => {
    // if (e.target.  const skills = data.skills;
    //   setData({
    //     ...data,
    //     skills: [...skills, e.target.name],
    //     id: getId(),
    //   });
    //   return;
    // }
    // console.log(e);
    // setData({
    //   ...data,
    //   [e.target.name]: e.target.value,
    //   id: getId(),
    // });


    setData({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const getId = () => {
    if (state.users.length === 0) {
      return 1;
    } else {
      const selectedUser = state.users[state.users.length - 1];
      const id = Number(selectedUser.id) + 1;
      return id;
    }
  };

  const dispatchHandler = () => {
    // setData({ ...data, id: getId() });
    console.log(data);
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
    }

    localStorage.setItem("data", JSON.stringify({ users: [data] }));
    handleClose();
  };

  useEffect(() => {
    getSkills();
  }, [data.skills.length]);

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
              value={selectedUser.name}
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="lastName"> نام خانوادگی</label>
            <input
              className="px-3 py-2"
              type="text"
              name="lastName"
              onChange={changeHandler}
              value={selectedUser.lastName}
            />
          </div>
          <div className="d-flex flex-column gap-3 ">
            <label htmlFor="dateOfBirthDay"> تاریخ تولد</label>
            <input
              className="px-3 py-2"
              type="date"
              name="dateOfBirthDay"
              onChange={changeHandler}
              value={selectedUser.dateOfBirthDay}
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
                  checked={skills.html}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="javascript"> javascript</label>
                <input
                  type="checkbox"
                  name="javascript"
                  id="javascript"
                  onChange={changeHandler}
                  checked={skills.javascript}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="react"> react</label>
                <input
                  type="checkbox"
                  name="react"
                  id="react"
                  onChange={changeHandler}
                  checked={skills.react}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="next"> next</label>
                <input
                  type="checkbox"
                  name="next"
                  id="next"
                  onChange={changeHandler}
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
