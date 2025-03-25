import React, { memo, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuthContext } from '../context/AuthContextInfo';
// import { useLectureContext } from '../context/LectureContextInfo';

const Header = memo(() => {
  const { auth, SetAuth } = useAuthContext();
  // const { lectures,setLectures} = useLectureContext();

  const [ lecture,setLecture] = useState(null)
const { id } = useParams();
console.log(id)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleLogOut = () => {
    SetAuth({ ...auth, user: null, token: "" });

    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };





  useEffect(() => {
    const getLecture = async () => {


      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/lecture/getLecture/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth?.token,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch lecture details");

        const data = await response.json();
        console.log(data.lecture)
        setLecture(data.lecture);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) getLecture();
  }, [id,auth?.token]);


  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div className="container-fluid">
      {/* Toggler Button */}
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
        {/* Brand */}
        <Link to="/" className="navbar-brand">PDF Upload</Link>
  
        {/* Search Bar (LEFT for Small Screens, CENTERED for Mid & Large Screens) */}
        <div className="d-md-none w-100">
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search Your Chats" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
  
        <div className="d-none d-md-flex justify-content-center w-100">
          <form className="d-flex w-50">
            <input className="form-control me-2" type="search" placeholder="Search Your Chats" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
  
        {/* Navigation Items */}
        <ul className="navbar-nav d-flex align-items-center  gap-2"
        style={{paddingRight:"3rem"}}
        >
  <li className="nav-item">
    <NavLink to="/" className="nav-link ">Home</NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/about" className="nav-link">About</NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/getAllLecture" className="nav-link ">Lectures</NavLink>
  </li>

  {!auth?.user ? (
    <>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link ">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link ">Login</NavLink>
      </li>
    </>
  ) : (
    <li className="nav-item dropdown">
      <NavLink className="nav-link dropdown-toggle " to="#" role="button" data-bs-toggle="dropdown">
        {auth?.user?.name}
      </NavLink>
      <ul className="dropdown-menu text-center"
      

      >
{/*        
       {!lecture?._id ? (
  <li className="dropdown-item text-muted">No Lecture Yet</li>
) : (
  <li>
    <NavLink to={`/pdflecture/${lecture._id}`} className="dropdown-item">
      View Lecture
    </NavLink>
  </li>
)} */}

        
        <li       >
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
