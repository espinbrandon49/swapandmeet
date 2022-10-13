import React, { useContext, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Registration = () => {

  const [image, setImage] = useState({})

  const initialValues = {
    username: "",
    password: "",
    image: "",
  };

  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(14).required("Must be 3-15 characters"),
    password: Yup.string().min(4).max(14).required("must be 4-14 characters"),
  });

  const onSubmit = (data) => {
    sendImage()

    axios.post("http://localhost:3001/api/auth", //data
      {
        username: data.username,
        password: data.password,
        image: image.name.replace(/\s/g, '').toLowerCase(),
      }
    ).then((response) => {
      // console.log(data);
      login(data.username, data.password)
    })
  };

  // Post image
  const fileOnChange = (event) => {
    setImage(event.target.files[0])
  }

  const sendImage = (event) => {
    // event.preventDefault()
    console.log(image)
    let formData = new FormData()
    formData.append('image', image)
    axios
      .post("http://localhost:3001/api/products/upload", formData, {})
      .then((response) => {
        console.log(response)
      })
  }

  function login(data1, data2) {
    const data = { username: data1, password: data2 };
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
        navigate('/')
      }
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="container">
        <div className="form-floating mb-3">
          <Field className="form-control" autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123...)" />
          <label>Username</label>
          <ErrorMessage name="username" component="div" />
        </div>
        <div className="form-floating mb-3">
          <Field className="form-control" autoComplete="off" id="inputCreatePost" name="password" type="password" placeholder="Your Password..." />
          <label htmlFor="">Password</label>
          <ErrorMessage name="password" component="span" />
        </div>

        <input id="file" name="file" type="file" onChange={fileOnChange} className="mb-3" />
        <br />

        <button type="submit" className="btn btn-outline-primary">Register</button>
      </Form>
    </Formik>
  );
};

export default Registration;
