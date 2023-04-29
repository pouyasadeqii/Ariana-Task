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
  // console.log(selectedUser);

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
    // const userOldSkills = selectedUser.skills;
    // console.log('change', e.target.name, e.target.checked)
    if (e.target.checked) {
      // if (skills[e.target.name] === false) {
      setSkills({ ...skills, [e.target.name]: true });

      // setUpdatedUser({
      //   ...updatedUser,
      //   skills:  Object.keys(skills).filter(key => skills[key] === true),
      // });
      // }
    }

    if (!e.target.checked) {
      const userSkills = { ...skills };
      // console.log('1',userSkills)
      // delete userSkills[e.target.name];
      userSkills[e.target.name] = !userSkills[e.target.name];
      // console.log('2',userSkills)
      setSkills(userSkills);
      const allSkills = updatedUser.skills;
      // console.log('3',userSkills)
      // const skillsKeys = Object.keys(skills);

      const newSkills = allSkills.filter((skill) => skill !== e.target.name);
      // console.log('4',userSkills)
      // setUpdatedUser({
      //   ...updatedUser,
      //   skills: newSkills,
      // });
      // console.log(skills);
    }
  };

  // console.log(skills);
  // console.log(updatedUser.skills);

  const dispatchHandler = () => {
    const editedUsers = state.users.map((user) => {
      if (user.id === id) {
        
        // user.name = updatedUser.name;
        // user.lastName = updatedUser.lastName;
        // user.dateOfBirthDay = updatedUser.dateOfBirthDay;
        // user.skills = Object.keys(skills).filter((key) => skills[key] === true);
        return {
          ...updatedUser,
          skills: Object.keys(skills).filter((key) => skills[key] === true),
        };
      }
    });

    console.log("edited users", editedUsers);
    // console.log("skills", skills);
    // const filterdUser = state.users.filter((user) => user.id !== id);
    // const selectedUser = state.users.find((user) =>{
    //   if ( user.id === id) {
    //     user
    //   }
    // });
    // console.log([
    //   ...filterdUser,
    //   {
    //     ...selectedUser,
    //     ...updatedUser,
    //     skills: Object.keys(skills).filter((key) => skills[key] === true),
    //   },
    // ])
    // setUpdatedUser({
    //   ...updatedUser,
    //   id: selectedUser.id,
    //   skills: Object.keys(skills).filter((key) => skills[key] === true),
    // });

    dispatch({
      type: "edit",
      payload: editedUsers,
    });
    if (localStorage.getItem("data")) {
      const users = JSON.parse(localStorage.getItem("data"));
      // console.log(...users.users);
      localStorage.setItem(
        "data",
        JSON.stringify({
          users: editedUsers,
        })
      );
      handleClose();
      return;
    }

    // localStorage.setItem("data", JSON.stringify({ users: [data] }));
    // handleClose();
  };
  // console.log(skills);
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
