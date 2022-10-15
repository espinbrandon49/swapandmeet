import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Cart = () => {
  const { authState } = useContext(AuthContext);
  const [cart, setCart] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cart/${id}`).then((response) => {
      console.log(response.data)
      if (response.data.length > 0) {
        console.log(response.data)
        setCart(true)
      }
    });
  }, []);

  const createCart = () => {
    axios.post('http://localhost:3001/api/cart/createCart',
    {},
     {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      console.log(response.data)
      setCart(true)
    });
  }
  
  return (
    <div>
      <>
      <h2>Hello, Cart</h2>
      <button onClick={createCart}>Create Cart</button>
      </>
    </div>
  )
}

export default Cart
