import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContextInfo";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function UserPrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuthContext();

  const authCheck = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/auth/user-auth`, {
            // headers: { Authorization: auth?.token }, 
          });
      setOk(res.data.ok);
    } catch (error) {
      setOk(false);
    }
  };

  useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (!ok) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>;
  }

  return <Outlet />;
}

export default UserPrivateRoute;


// Initial Load:

// When the component mounts for the first time, the useEffect runs because of the empty dependency array, and it checks the auth?.token value.
// If auth?.token has a truthy value (meaning there is a token), it calls the authCheck function, making a request to the server to check if the user is authenticated.

// Subsequent Updates:

// If, during the component's lifecycle, the auth?.token value changes (e.g., user logs in or logs out), the useEffect will run again due to the change in the auth?.token dependency.
// It will then re-run the authCheck function, making a new request to the server if auth?.token is truthy.
