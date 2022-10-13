import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { AuthContext } from "../helpers/AuthContext";

const styles = {
  width: {
    width: "200px",
    height: "200px"
  },
};

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [userCategories, setUserCategories] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:3001/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
      setImage(response.data.image);
    });

    axios.get(`http://localhost:3001/api/categories/byuserId/${id}`).then((response) => {
      setUserCategories(response.data);
    });

    axios.get(`http://localhost:3001/api/products/productbyuserId/${id}`).then((response) => {
      // console.log(response.data)
      setUserProducts(response.data);
    });

    axios.get("http://localhost:3001/api/categories").then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  const editProduct = (field, defaultValue, pid) => {
    if (field === "product_name") {
      let newProductName = prompt('Enter new product name', defaultValue);
      axios
        .put("http://localhost:3001/api/products/productName", {
          newProductName: newProductName,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
      setUserProducts([...userProducts])
    } else if (field === "price") {
      let newProductPrice = prompt('Enter new price', defaultValue);
      axios
        .put("http://localhost:3001/api/products/productPrice", {
          newProductPrice: newProductPrice,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setUserProducts([...userProducts,]);
        });
    } else {
      let newStock = prompt('Enter new stock count', defaultValue);
      axios
        .put("http://localhost:3001/api/products/stock", {
          newStock: newStock,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
    }
    window.location.replace(`/category/${id}`)
  }
  
  return (
    <div className="container text-center">
      <div className="mb-3">
        <h1 className="lobster">{authState.username === username ? "Your Shop" : username  }</h1>
        <img src={`http://localhost:3001/public/image-${image}`} style={styles.width} alt=" " />
      </div>

      <div className="mb-3" >
        <h4 className="openSans">Categories</h4>
        {userCategories.map((value, key) => {
          return (
            <ListGroup action variant="primary"
              key={value.id}
              className=""
              onClick={() => {
                navigate(`/category/${value.id}`);
              }}
            >

              <ListGroup.Item action variant="primary">
                {value.category_name}
              </ListGroup.Item>


            </ListGroup>
          );
        })}
      </div>

      <div >
        <h4 className="openSans">Products</h4>
        <div className="d-flex justify-content-center flex-wrap">
        {userProducts.map((value, key) => {
          return (
            <Card
              style={{ width: '9rem' }}
              key={value.id}
              className=""
              onClick={() => {
                navigate(`/category/${value.category_id}`);
              }}
            >
              <Card.Img className="p-3" variant="top" src={`http://localhost:3001/public/image-${value.image}`} />
              <Card.Body className="openSans bg-warning fs-6 fw-bold" >{value.product_name}</Card.Body>
            </Card>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Profile;