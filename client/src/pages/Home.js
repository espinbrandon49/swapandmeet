import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';
import AddCategory from './AddCategory';
import AddTag from './AddTag';

const Home = () => {
  const [categories, setCategories] = useState([])

  // const [products, setProducts] = useState([])
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    } else {
      axios.get('http://localhost:3001/api/categories').then((response) => {
        setCategories(response.data)
      })
      navigate('/')
    }
  }, [])

  return (
    <div className='container '>
      <div className='yellowDotBorder my-5 p-3 d-flex align-items-center flex-wrap'>
        <h1 className='openSans' onClick={() => navigate(`/profile/${authState.id}`)}>Welcome, {authState.username}</h1>

        <p className='lobster fs-5 text-muted'>A gathering at which enthusiasts or collectors trade or exchange items of common interest</p>
      </div>

      <div className='w-75 mb-5 mx-auto'>
        <ListGroup className='container text-center'>
          <ListGroup.Item variant="primary" ><h6 className='fw-bold openSans' >VIEW BY CATEGORY</h6></ListGroup.Item>
          {categories.map((value, key) => {
            return (
              <ListGroup.Item action variant="primary"
                key={value.id}
                className="category lobster"
                onClick={() => { navigate(`/category/${value.id}`) }}
              >
                <span className="fs-3" > {value.category_name} </span><span className="openSans ">added by {authState.username === value.username ? "You" : value.username}</span>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>

      <div className='purpleDotBorder'>
        <div className='m-4 bg-light rounded-top pb-3 mb-3 border-5 border-warning border-bottom ' >
          <h5 className="openSans bg-secondary p-3 text-light rounded-top">Add A Category</h5>
          <AddCategory />
        </div>

        <div className='m-4 bg-light rounded-top pb-3 mb-3 border-5 border-warning border-bottom'>
          <h5 className="openSans bg-secondary text-light p-3 rounded-top">Add A Tag</h5>
          <AddTag />
        </div>
      </div>
    </div>
  )
}
export default Home