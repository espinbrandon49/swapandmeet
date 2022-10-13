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
      <FloatingLabel
        controlId="floatingInput"
        label="Shop Name"
        className="mb-3 lobster"
      >
        <Form.Control
          type="text"
          className="openSans"
          placeholder="John123..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3 openSans"
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
        className="btn btn-outline-primary"
      >Login</button>
    </div>
  );
};

export default Login;
