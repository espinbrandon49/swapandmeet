import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddTag from "./pages/AddTag";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
// username can be accessed everywhere by importing {AuthContext} and using {authState}
//can really add anyuthing you wanted to authState and also modify using setAuthState

import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./pages/AddProduct";

const styles = {
  navbar: {
    backgroundColor: "#162D5D",
  },
}

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    window.location.replace("/")
  };

  return (
    <div className="App ">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar style={styles.navbar} expand="md" className="">
            <Container>
              <Navbar.Brand href="/" className="text-light lobster fs-1" >React-EZ-Commerce</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {!authState.status ? (
                    <>
                      <Nav.Link ><Link className='link ' to="/login">Login</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/registration">Registration</Link></Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link><Link className='link' to="/addcategory">Add Category</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/addtag">Add Tag</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/addproduct">Add Product</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/">Home</Link></Nav.Link>
                    </>
                  )}
                  {authState.status &&
                    <NavDropdown title="Profile" id="dropdown" className="link" >
                      <Nav.Link><Link className='dropdown-item' to={`/profile/${authState.id}`}>{authState.username}</Link></Nav.Link>
                      <Nav.Link><button className="btn btn-outline-primary" onClick={logout}>Logout</button></Nav.Link>
                    </NavDropdown>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/addcategory" exact element={<AddCategory />} />
            <Route path="/addtag" exact element={<AddTag />} />
            <Route path="/addproduct" exact element={<AddProduct />} />
            <Route path="/category/:id" exact element={<Category />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div >
  );
}

export default App;

//you are making a swapmeet (swap & meet)

//update price glitch (DONE)
//update single product items (DONE)
//add product to navbar and as a separate page (DONE)

//addproduct bug
//auto logout
// personalize shop name (add field to model)
// Add shopping cart to profile link, and as a new page, add products "user has many products".
// view anyone's shop.
//select products from anyone's shop.
// subtract from stock
//add friends

// add checkout

// update products on single form. 
// update product images
// update shop name
// update username
// update password 
// update avatar


//bugs
  //Categories do not populate immediately, need to reload
  //Product updates/edits do not populate immediately, need to reload
  //Product tags do not populate immediately, need to reload
  //Products can't be deleted immediately, need to reload