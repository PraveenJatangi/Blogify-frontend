import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Nav/NavBar';
import Home from './Components/Home1';
import Signup from './Components/signup';
import Signin from './Components/Signin/sign';
import  AddBlog from './Components/AddBlog/addBlog';
import ViewBlog from './Components/ViewBlog/viewBlog';
// If you have this
// import AddBlog from './Components/AddBlog'; // If you have this

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("fethced data",data);
        if (data.user) {
          console.log("fethced data ",data);
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch user.");
      });
  }, []);
  

  return (
    <Router>
      <Navbar user={user} error={error} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin setUser={setUser}  />} />
        <Route path="/blog/add-blog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<ViewBlog user={user} />} />
        {/* <Route path="/blog/add-blog" element={<AddBlog />} /> */}
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
