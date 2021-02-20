import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import "./Register.scss";
import { userRegistration } from "../../Actions/UserAction";

const Register = () => {
  const history = useHistory();
  const [state, setState] = useState({ 
    name: "",
    email: "",
    password: "" 
  });
  const [valid, setValid] = useState(false);
  const [warning, setWarning] = useState("");
  
  const handleNameChange = (e) => {
    const { value } = e.target;
    setState({ ...state, name: value });
    handleValidation("name", value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setState({ ...state, email: value });
    handleValidation("email", value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({ ...state, password: value });
    handleValidation("password", value);
  };

  const handleValidation = (field, value) => {
    const nameRegExp = new RegExp("^[a-zA-Z0-9]*$");
    const emailRegExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]$");
    const passwordRegExp = new RegExp("^[a-zA-Z0-9]{1,20}$");
    let result, message;
    if (field === "name") {
      result = nameRegExp.test(value);
      message = "Special characters not allowed";
    }
    else if (field === "email") {
      result = emailRegExp.test(value);
      message = "Invalid Email";
    }
    else if (field === "password") {
      result = passwordRegExp.test(value);
      message = "Special characters are not allowed / max length is 20";
    }

    if (!result) {
      setValid(false);
      setWarning(message);
      setTimeout(() => {
        setWarning("");
      }, 2000);
    } else setValid(true);
  };

  const handleSubmit = () => {
    if(valid) {
      userRegistration(state);
      history.push("/login");
    }
  };
  return (
    <div className="wrapper">
      <div className="card">
        <div className="container">
          <div>
          <h2>Register</h2>
          </div>
          <div>
            <TextField
              onChange={handleNameChange}
              label="Name"
              value={state.name}
            />
          </div>
          <div>
            <TextField
              onChange={handleEmailChange}
              value={state.email}
              label="Email"
            />
          </div>
          <div>
            <TextField
              onChange={handlePasswordChange}
              type="password"
              value={state.password}
              label="Password"
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </div>
          {warning && 
            <div>
              <Alert severity="warning" variant="filled">
                {/* <AlertTitle>Info</AlertTitle> */}
                {warning}
              </Alert>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Register;
