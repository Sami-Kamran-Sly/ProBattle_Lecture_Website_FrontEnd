import React, { memo } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from '../context/AuthContextInfo';
import { useLectureContext } from '../context/LectureContextInfo';

const Header = memo(() => {
  const { auth, SetAuth } = useAuthContext();
  const { lecture} = useLectureContext();

  const handleLogOut = () => {
    SetAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">PDF Upload</Link>
          
          <div className="d-flex justify-content-center flex-grow-1">
            <form className="d-flex w-50">
              <input className="form-control me-2" type="search" placeholder="Search Your Chats" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link">Home</NavLink>
   

            </li>

            <li className="nav-item">

            <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
   

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown mx-1 px-5">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu ml-5">
                  <li>
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleLogOut} to="/login" className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Header;
