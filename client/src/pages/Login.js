import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate()

  function login() {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/api/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token)
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        });
        navigate(`/profile/${response.data.id}`)
      }
    });
  };

  return (
    <div className="container">
      <div className="bg-white border rounded border-secondary p-3 my-3 openSans">
      <h2 className="openSans mx-3">Log In</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Shop Name"
        className="m-3 lobster"
      >
        <Form.Control
          type="text"
          className=""
          placeholder="John123..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="m-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FloatingLabel>
      <button
        onClick={login}
        className="btn btn-outline-primary mx-3"
      >Login</button>
      </div>
    </div>
  );
};

export default Login;
