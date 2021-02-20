import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import "./Login.scss";
import { userLogin } from "../../Actions/UserAction";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState(
    { 
      email: "",
      password: "" 
    });

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setState({ ...state, email: value });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({ ...state, password: value });
  };

  const handleSubmit = () => {
    const result = userLogin(state);
    history.push("/home");
  };
  return (
    <div className="wrapper">
      <div className="card">
        <div className="container">
          <div>
            <h2>Login</h2>
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
              Login 
            </Button>
          </div>
          <div>
            <Link to="/register" className="btn btn-link">Click here to Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
