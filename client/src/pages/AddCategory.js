import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../helpers/AuthContext";

const AddCategory = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  const initialValues = {
    category_name: "",
    username: authState.username
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().min(3).max(15).required("Category names are 3-15 characters long")
  })

  const onSubmit = (data, {resetForm}) => {
    axios.post('http://localhost:3001/api/categories', {category_name: data.category_name, username: authState.username}, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      resetForm()
      window.location.replace('http://localhost:3000/')
      // navigate('/')
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}  >
      <Form className='container'>
        <div className="form-floating" >
          <Field
            className="form-control"
            autoComplete='off'
            id="categoryInput"
            name="category_name"
          />
          <label>Category</label>
          <ErrorMessage name="category_name" component='div' />
        </div>
        <button type='submit' className="btn btn-outline-primary my-3" >Add Category</button>

      </Form>
    </Formik>
  )
}

export default AddCategory