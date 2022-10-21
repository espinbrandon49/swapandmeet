import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddTag = () => {
  const [tagAdded, setTagAdded] = useState({status: false, tag: ''})
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  const initialValues = {
    tag_name: ""
  }

  const validationSchema = Yup.object().shape({
    tag_name: Yup.string().min(3).max(15).required("Tag names are 3-15 characters long")
  })

  const onSubmit = (data, {resetForm}) => {
    axios.post('http://localhost:3001/api/tags', data).then((response) => {
      resetForm()
      setTagAdded({status: true, tag: data.tag_name})
      navigate('/')
      console.log(data)
    });
  };

  return (
    <div className='container openSans'>
      <div className='bg-white my-3 p-3 border border-secondary rounded'>
        <h2 className='mx-3 mb-3'>Add A Tag</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}  >
        <Form className='container'>
          <div className='form-floating mb-3'>
          <Field
            autoComplete='off'
            id="tagInput"
            name="tag_name"
            className="form-control"
          />
          <label>Tag Name</label>
          <ErrorMessage name="tag_name" component='div' />
          </div>
          <button type='submit' className="btn btn-outline-primary">Add Tag</button><span className="openSans mx-2 fst-italic"> {tagAdded.status && tagAdded.tag + " " + "Tag Added"}</span>
        </Form>
      </Formik>
      </div>
    </div>
  )
}

export default AddTag