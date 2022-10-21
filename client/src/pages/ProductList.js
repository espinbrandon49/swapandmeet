import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ProductList = ({ singleCategory }) => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({})
  const { authState } = useContext(AuthContext);
  const [allCategories, setAllCategories] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3001/api/categories").then((response) => {
      setAllCategories(response.data);
    })

    axios.get(`http://localhost:3001/api/products/${id}`).then((response) => {
      setProducts(response.data);
    });

    axios.get(`http://localhost:3001/api/tags`).then((response) => {
      setTags(response.data);
    });

    axios.get(`http://localhost:3001/api/cart/${id}`).then((response) => {
      setShoppingCart(response.data)
    });
  }, []);

  if (shoppingCart.user_id === authState.id) {
    // console.log(shoppingCart)
  };
  // console.log(shoppingCart) if shopping cart does not display try this
  // console.log(Object.keys(shoppingCart).length)

  function nameCategory() {
    let categoryName
    if (allCategories.length > 0) {
      categoryName = allCategories.filter((value, i) => value.id == id)[0].category_name
    }
    return categoryName
  }

  const initialValues = {
    image: "rangerTab.png",
    product_name: "",
    username: authState.username,
    price: "",
    stock: "",
    categoryName: "",
    category_id: "",
    userId: authState.id,
    tagIds: [],
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().min(3).max(15).required("Product names are 3-15 characters long"),
    price: Yup.number().required("Price is a number").positive(),
    stock: Yup.number().required("Stock is an integer").positive().integer(),
    tagIds: Yup.number().required("Please Select A Tag").typeError('Please select at least one tag')
  });

  const onSubmit = (data, { resetForm }) => {
    sendImage()
    axios
      .post("http://localhost:3001/api/products", // data,
        {
          image: image.name.replace(/\s/g, '').toLowerCase(),
          product_name: data.product_name,
          username: authState.username,
          price: data.price,
          stock: data.stock,
          categoryName: !id ? data.category_id.split(',')[1] : nameCategory(),
          category_id: !id ? data.category_id.split(',')[0] : id,
          userId: authState.id,
          tagIds: data.tagIds,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const productToAdd = response.data;
          setProducts([...products, data]);
          window.location.replace(`/category/${!id ? data.category_id.split(',')[0] : id}`)
          resetForm();
        }
      });
  };

  // Post image
  const fileOnChange = (event) => {
    setImage(event.target.files[0])
  }

  const sendImage = (event) => {
    let formData = new FormData()
    formData.append('image', image)
    axios
      .post("http://localhost:3001/api/products/upload", formData, {})
      .then((response) => {
        console.log(response)
      })
  }

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/api/products/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setProducts(
          products.filter((val) => {
            return val.id !== id;
          })
        );
      })
      .then(() => window.location.reload())
  };

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
      setProducts([...products])
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
          setProducts([...products,]);
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

  //PRODUCT ROUTES
  const addToCart = (pid) => {
    axios
      .post('http://localhost:3001/api/products/addtocart',
        {
          pid:pid
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
      .then((response) => {
        console.log(response.data)
      });
  }

  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center">
        {products.map((value, key) => {
          return (
            <Card key={key} style={{ width: '12rem' }} className="m-3 openSans border border-secondary " >

              <Card.Img className="p-1" variant="top" src={`http://localhost:3001/public/image-${value.image}`} alt={`product that is a ${value.product}`} />

              <Card.Body
                className="productName d-flex justify-content-between align-items-center"
              >
                <Card.Title className="fs-6 fw-bold yellowDotBorder p-2 w-100 text-center" >{value.product_name}</Card.Title>
                {authState.username === value.username && <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    if (authState.username === value.username) {
                      editProduct("product_name", value.product_name, value.id)
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                  </svg>
                  <span className="visually-hidden">Button</span>
                </button>
                }
              </Card.Body>

              <ListGroup className="list-group-flush">
                <ListGroup.Item
                  className="productPrice d-flex justify-content-between align-items-center"
                ><div><span className="lobster" >Price: </span><span>${value.price}</span></div>
                  {authState.username === value.username && <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      if (authState.username === value.username) {
                        editProduct("price", value.price, value.id)
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                    </svg>
                    <span className="visually-hidden">Button</span>
                  </button>}
                </ListGroup.Item>

                <ListGroup.Item
                  className="productStock d-flex justify-content-between align-items-center"
                ><div><span className="lobster"> Stock: </span>{value.stock}</div>
                  {
                    authState.username === value.username && <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        if (authState.username === value.username) {
                          editProduct("stock", value.stock, value.id)
                        }
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                      </svg>
                      <span className="visually-hidden">Button</span>
                    </button>
                  }
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="lobster" >Tags:</span> {tags
                    .filter((tag) => {
                      let x = tag.products.map((el) => el.product_name);
                      if (x.includes(value.product_name)) {
                        return tag.tag_name;
                      }
                    })
                    .map((el) => <span>{el.tag_name}, </span>)}
                </ListGroup.Item>

              </ListGroup>

              {authState.username === value.username
                ? <Card.Body>
                  <button
                    variant="danger"
                    onClick={() => deleteProduct(value.id)}
                    className="btn btn-outline-danger w-100"
                  >
                    Remove
                  </button>
                </Card.Body>
                : <Card.Body>
                  <button
                    variant="danger"
                    onClick={() => addToCart(value.id)}
                    className="btn btn-outline-secondary w-100"
                  >
                    Add To Cart
                  </button>
                </Card.Body>
              }
            </Card>
          );
        })}
      </div>

      {singleCategory.username === authState.username && <div className="purpleDotBorder p-3 mb-3 bg-white">
        <h3 className="openSans mb-3">Add A Product</h3>
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
          <Form className="container openSans">

            <div className="form-floating mb-3">
              <Field autoComplete="off"
                className="form-control border border-info"
                id="product_nameInput" name="product_name" placeholder="(Ex. Navy Blue Shorts...)" />
              <label>Product</label>
              <ErrorMessage name="product_name" component="div" div />
            </div>

            <div className="form-floating mb-3">
              <Field autoComplete="off"
                className="form-control border border-info"
                id="priceInput" name="price" placeholder="(Ex.10...)" />
              <label>Price</label>
              <ErrorMessage name="price" component="div" />
            </div>

            <div className="form-floating mb-3">
              <Field autoComplete="off"
                className="form-control border border-info"
                id="stock_nameInput" name="stock" placeholder="(Ex. 10...)" />
              <label>Stock</label>
              <ErrorMessage name="stock" component="" />
            </div>

            {!id &&
              <div>
                <label>Select Category</label>
                <ErrorMessage name="category_id" component="div" className="text-danger bg" />
                <Field as="select"
                  name="category_id"
                >
                  <option>Select A Category</option>
                  {allCategories.map((value, i) => {
                    return <option key={i} value={[value.id, value.category_name]} label={value.category_name}>value.category_name</option>
                  })
                  }
                </Field>
              </div>}

            <ErrorMessage name="tagIds" component="div" />
            <div className="mb-3">
              {tags.map((tag, key) => {
                return (
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="checkbox" name="tagIds" value={tag.id.toString()} key={tag.id} />
                    <label className="form-check-label" key={key}>{tag.tag_name}</label>
                  </div>
                );
              })}
            </div>

            <input id="file" name="file" type="file" onChange={fileOnChange} className="mb-3" />
            <br />

            <button type="submit" className="btn btn-outline-primary">Add Product</button>

          </Form>
        </Formik>
      </div>}

    </div>
  );
};

export default ProductList;