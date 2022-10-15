import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";


const AddProduct = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({})
  const { authState } = useContext(AuthContext);
  const [allCategories, setAllCategories] = useState([]);

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
  }, []);

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
          categoryName: data.category_id.split(',')[1],
          category_id: data.category_id.split(',')[0],
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
console.log(allCategories.filter((myCategories, id) => myCategories.username === authState.username))
  return (
    <div className="border border-primary p-3 mb-3">
      <div className="border border-primary p-3 mb-3">
        <h3 className="display-6 mb-3">Add A Product</h3>
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
          <Form className="container">

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
                  {
                  allCategories
                  .filter((myCategories, id) => myCategories.username === authState.username)
                  .map((value, i) => {
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
                    <Field className="form-check-input" type="checkbox" name="tagIds" value={tag.id.toString()} />
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
      </div>
    </div>
  )
}

export default AddProduct
