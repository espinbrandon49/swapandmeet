import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Cart = () => {
  const { authState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState(false);
  const [shoppingCart, setShoppingCart] = useState({});

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cart/${id}`).then((response) => {
      if (response.data.length > 0) {
        setCart(true)
        setShoppingCart(response.data)
      }
    });

    axios.get(`http://localhost:3001/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

  }, [setCart]);

  console.log(username)
  console.log(cart)
  console.log(shoppingCart)

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
        <h2>Hello, {username}</h2>
        
        {!shoppingCart && <button onClick={createCart}>Create Cart</button>}

        {shoppingCart && (
          shoppingCart[0]?.products.length === 0 && (
            <div>Shopping Cart Empty</div>
          )
        )}

        {shoppingCart && (
          shoppingCart[0]?.products.length > 0 && (
            <div>Shopping Cart Has A Product</div>
          )
        )}
      </>
    </div>
  )
}

export default Cart
