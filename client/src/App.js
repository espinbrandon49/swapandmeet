import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
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
import Cart from "./pages/Cart";

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
  // const location = useLocation();

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

  // let timer;

  // const runTimer = () => {
  //   timer = setTimeout(() => {
  //     logout()
  //   }, 900000)
  // }
  // runTimer();

  // window.addEventListener('click', (e) => {
  //   clearTimeout(timer)
  //   runTimer()
  // })

  // window.addEventListener('mousemove', (e) => {
  //   clearTimeout(timer)
  //   runTimer()
  // })

  // window.addEventListener('scroll', (e) => {
  //   clearTimeout(timer)
  //   runTimer()
  // })

  // window.addEventListener('keydown', (e) => {
  //   clearTimeout(timer)
  //   runTimer()
  // })

  // window.addEventListener('keyup', (e) => {
  //   clearTimeout(timer)
  //   runTimer()
  // })

  return (
    <div className="App bg-light">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar style={styles.navbar} expand="md" className="">
            <Container>
              <Navbar.Brand href="/" className="text-light lobster fs-1" >EZ Swap Meet</Navbar.Brand>
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
                      <Nav.Link><Link onClick={() => window.location.replace(`http://localhost:3000/profile/${authState.id}`)} className='dropdown-item' to={`/profile/${authState.id}`}>{authState.username}</Link></Nav.Link>
                      <Nav.Link><Link className='dropdown-item' to={`/cart/${authState.id}`}>Cart</Link></Nav.Link>
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
            <Route path="/profile/:id" exact element={<Profile logout={logout} />} />
            <Route path="/cart/:id" exact element={<Cart/>} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
          <div className="push"></div>
          <footer className="fixed-bottom text-center">

            {/* {location.pathname !== '/' && (
              <button
                className="btn btn-outline-secondary my-3"
                onClick={() => navigate(-1)}
              >
                &larr; Go Back
              </button>
            )} */}
            <p className=''> Project By Brandon Espinosa &nbsp;
              <button type="button" className="btn btn-outline-light" onClick={() => window.location.replace("https://github.com/espinbrandon49/swapandmeet")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </button>
            </p>
          </footer>
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
//addproduct bug (DONE)
//auto logout (DONE)
// view anyone's shop. (DONE)
//update button to category name, add username to category (DONE)
//add swap meet description on homepage/registration (DONE)
// organize shop (DONE)
//footer (DONE)
//conditionally render categories on addProducts, ideally, you can't add to anyone's category (DONE)
// Add shopping cart to profile link, and as a new page (DONE)
// add products "user has many products". (DONE)
// select products from anyone's shop. (DONE)
// remove products from cart (DONE)
// ______________________MVP

// add checkout
// update shop name 
// follow shops
// _____________________stretch 1

// update products on single form
// update product images
// update shop name/username
// update password 
// update avatar
//_____________________stretch 2
