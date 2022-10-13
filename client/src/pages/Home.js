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
      // axios.get('http://localhost:3001/api/products').then((response) => {
      //   setProducts(response.data)
      // })
      navigate('/')
    }
  }, [])

  // useEffect(() => {
  //   setCategories([...categories])
  // }, [setCategories])
  // console.log(products)

  return (
    <div className='container'>
      <h1 className='openSans my-4 p-2 yellowDotBorder' onClick={() => navigate(`/profile/${authState.id}`) }>Hello, {authState.username}</h1>
      <div>
        <ListGroup className='container text-center'>
          <ListGroup.Item variant="primary" ><h6 className='fw-bold openSans' >VIEW BY CATEGORY</h6></ListGroup.Item>
          {categories.map((value, key) => {
            return (
              <ListGroup.Item action variant="primary"
                key={value.id}
                className="category lobster"
                onClick={() => { navigate(`/category/${value.id}`) }}
              >
                <span className="fs-3" > {value.category_name} </span><span className="openSans ">added by {authState.username === value.username? "You" : value.username}</span>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
      <div className='m-4 bg-light rounded-top ' >
        <h5 className="openSans bg-secondary p-3 text-light rounded-top">Add A Category</h5>
        <AddCategory />

      </div>
      <div className='m-4 bg-light rounded-top'>
        <h5 className="openSans bg-secondary text-light p-3 rounded-top">Add A Tag</h5>
        <AddTag />
      </div>
    </div>
  )
}
export default Home