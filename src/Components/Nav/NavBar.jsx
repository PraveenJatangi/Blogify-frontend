import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, error }) => {

   const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await fetch("http://localhost:8000/user/logout", {
  //       method: "GET",
  //       credentials: "include", // include cookies if using sessions
  //     });
      
  //     // Optionally clear local state, localStorage, etc.
  //     // e.g., localStorage.removeItem("user");

  //     // Redirect to login or home page
  //     navigate("/user/login");
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   }};
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Blogger</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>

            
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog/add-blog">Add Blog</Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.firstName}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                      <button onClick={handleLogout} className="btn btn-danger">  Logout </button>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/signup">Create Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/signin">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Error Message Display */}
      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
