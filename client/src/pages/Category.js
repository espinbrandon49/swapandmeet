import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import ProductList from "./ProductList";

const Category = () => {
  let { id } = useParams();
  const [singleCategory, setSingleCategory] = useState({});
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`).then((response) => {
      setSingleCategory(response.data);
    });
  }, []);

  const deleteCategory = (id) => {
    if (singleCategory.products.length > 0) {
      alert("Cannot Delete Categories With Products")
    } else {
      axios
        .delete(`http://localhost:3001/api/categories/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          navigate('/')
        })
    }
  }

  const editCategoryName = (defaultValue) => {
    let newCategoryName = prompt('Enter new category name', defaultValue);
    axios
      .put("http://localhost:3001/api/categories/categoryName", {
        newCategoryName: newCategoryName,
        id: id
      },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
    setSingleCategory({ ...singleCategory, category_name: newCategoryName })
  }

  return (
    <div className="container">
      <div className="mb-3">
        <h2
          className="display-3"
          onClick={() => {
            if (authState.username === singleCategory.username) {
              editCategoryName(singleCategory.category_name)
            }
          }}
        >
          {singleCategory.category_name}
        </h2>
        {authState.username === singleCategory.username &&
          <button
            onClick={
              () => { deleteCategory(singleCategory.id) }
            }
            className="btn btn-outline-danger"
          >
            Delete Category
          </button>
        }
      </div>

      <ProductList singleCategory={singleCategory}/>

    </div>
  );
};

export default Category;