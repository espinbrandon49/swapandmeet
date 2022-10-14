import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { AuthContext } from "../helpers/AuthContext";

const styles = {
  width: {
    width: "200px",
    height: "200px",

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
      setUserProducts(response.data);
    });

    axios.get("http://localhost:3001/api/categories").then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  const editProducts = (field, defaultValue, pid) => {
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
    <div className="container text-center ">

      <div className="my-3 border-5 border-warning border-bottom pb-1 mx-auto w-75">
        <h1 className="lobster">{authState.username === username ? "Your Shop" : username}</h1>
        <img className="yellowDotBorder m-3 p-2" src={`http://localhost:3001/public/image-${image}`} style={styles.width} alt=" " />
      </div>

      <div className="mb-3" >
        <h4 className="openSans mb-3 fs-2 ">Categories</h4>
        {userCategories.map((value, key) => {
          return (
            <>
              <div
               className="purpleDotBorder mx-5 mb-5"
               style={{backgroundColor: "#fff3cd"}}
               >
                <ListGroup action variant="primary"
                  key={value.id}
                  className="lobster fs-3 w-50 mx-auto my-3"
                  onClick={() => {
                    navigate(`/category/${value.id}`);
                  }}
                >
                  <ListGroup.Item action variant="primary">
                    {value.category_name}
                  </ListGroup.Item>
                </ListGroup>
                <div className="d-flex justify-content-center m-3 flex-wrap">
                  {userProducts
                    .filter((category, i) => category.categoryName === value.category_name)
                    .map((product, i) => (
                      <Card
                        style={{ width: '10rem' }}
                        key={product.id + 199}
                        className="m-3 openSans"
                      >
                        <Card.Img
                          className="p-1"
                          variant="top"
                          src={`http://localhost:3001/public/image-${product.image}`} />
                        <Card.Title>{product.product_name}</Card.Title>
                        <ListGroup className="list-group-flush" >
                          <ListGroup.Item>Price: {product.price} </ListGroup.Item>
                          <ListGroup.Item>Stock: {product.stock} </ListGroup.Item>
                          <ListGroup.Item className="" ><button type="button" className="btn btn-secondary"                       onClick={() => {
                          navigate(`/category/${product.category_id}`);
                        }}>Update</button></ListGroup.Item>
                        </ListGroup>
                      </Card>
                    )

                    )
                  }
                </div>
              </div>
              {/* <div className="border-5 border-warning border-bottom pb-1 mx-auto w-50" ></div> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;