import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
        <div className="d-flex">
        <h1
          className="lobster w-25 pb-1 mb-3 border-5 border-warning border-bottom "
        >
          {singleCategory.category_name}
        </h1>
        <button
          onClick={() => {
            if (authState.username === singleCategory.username) {
              editCategoryName(singleCategory.category_name)
            }
          }}
          className="btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
          </svg>
        </button>
        </div>
        <Link className="link" style={{ color: "black" }} to={`/profile/${singleCategory.userId}`} ><h2>at {singleCategory.username}</h2></Link>

        {authState.username === singleCategory.username &&
          <div >
            <button
              onClick={
                () => { deleteCategory(singleCategory.id) }
              }
              className="btn btn-outline-danger mx-1 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>Delete
            </button>

          </div>
        }
      </div>

      <ProductList singleCategory={singleCategory} />

    </div>
  );
};

export default Category;