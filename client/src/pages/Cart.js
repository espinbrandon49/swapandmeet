import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

const Cart = () => {
  const { authState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState(false);
  const [shoppingCart, setShoppingCart] = useState({});
  const [total, setTotal] = useState(0)
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cart/${id}`).then((response) => {
      if (response.data.id > 0) {
        setCart(true)
        setShoppingCart(response.data)  
      }
    });

    axios.get(`http://localhost:3001/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
  }, [setCart]);

  useEffect(() => {
    setTotal(shoppingCartTotal)
  }, [shoppingCart])

  const shoppingCartTotal = () => {
    let total = 0
    if (shoppingCart.products) {
      for (let i = 0; i < shoppingCart.products.length; i++) {
        total += parseInt(shoppingCart.products[i].price)
      }
    }
    return total
  }

  const createCart = () => {
    axios.post('http://localhost:3001/api/cart/createCart',
      {},
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        console.log(response.data)
        setCart(true)
      });
    window.location.reload()
  }

  const removeFromCart = (event) => {
    axios.post("http://localhost:3001/api/products/removefromcart",
      {
        pid: event.target.value.split(',')[1],
        cid: event.target.value.split(',')[0]
      }
    )
    window.location.reload()
  }

  return (
    <div className="container">
      <>
        <h2 className="openSans m-3">Shopping Cart for <span className="lobster" >{username}</span> </h2>
        <h3 className="openSans m-3">Total: ${total}</h3>

        {!cart && <button onClick={createCart}>Create Cart</button>}

        {shoppingCart && (
          shoppingCart.products?.length === 0 && (
            <div>Shopping Cart Empty</div>
          )
        )}

        {cart && (
          shoppingCart.products?.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center">
              {shoppingCart.products.map((value, i) => {
                return (
                    <Card
                      style={{ width: '10rem' }}
                      key={value.id + 4000}
                      className="m-3 openSans "
                    >
                      <Card.Img
                        className="p-1 "
                        variant="top"
                        src={`http://localhost:3001/public/image-${value.image}`}
                      />
                      <Card.Title
                        className="text-center"
                      >{value.product_name}</Card.Title>
                      <ListGroup className="list-group-flush " key={value.id + 5000}>
                        <ListGroup.Item className="" key={value.id + 6000}>Price: ${value.price} </ListGroup.Item>
                      </ListGroup>
                      <Card.Body>
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100 fs-6"
                          onClick={removeFromCart}
                          value={[value.product_cart.id, value.id]}
                        >Remove From Cart</button>
                      </Card.Body>
                    </Card>
                )
              })}
            </div>
          )
        )}
      </>
    </div>
  )
}

export default Cart
