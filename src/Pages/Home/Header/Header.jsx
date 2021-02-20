import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Header.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("user");
  const userDetails = JSON.parse(localStorage.getItem(user));
  const [state, setState] = useState({
    name: userDetails.name,
    password: userDetails.password,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const user = localStorage.getItem("user");
    localStorage.removeItem(user);
    localStorage.setItem("user", "");
    history.push("/login");
  };
  const handleNameChange = (e) => {
    const { value } = e.target;
    setState({ ...state, name: value });
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({ ...state, password: value });
  };

  const updateUser = () => {
    const objStr = localStorage.getItem(user);
    const obj = JSON.parse(objStr);
    obj.name = state.name;
    obj.password = state.password;
    localStorage.setItem(user, JSON.stringify(obj));
    alert("Profile updated successfully");
  };

  const body = (
    <div style={modalStyle} className={classes.paper + " modalcontainer"}>
      <div>
        <TextField
          id="login-name"
          onChange={handleNameChange}
          label="Full Name"
          value={state.name}
        />
      </div>
      <div>
        <TextField
          id="login-pw"
          onChange={handlePasswordChange}
          type="password"
          value={state.password}
          label="Password"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={updateUser}>
          Update
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={handleDelete}>
          Delete user
        </Button>
      </div>
    </div>
  );
 
  return (
    <div className="mainwrapper">
      <div className="title">NEWS PORTAL</div>
      <div className="settings">
        <Link to="/savedlater"className="link" >Read later articles</Link>
        <div className="cptr" onClick={handleOpen}>
          <Avatar>SM</Avatar>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default Header;
