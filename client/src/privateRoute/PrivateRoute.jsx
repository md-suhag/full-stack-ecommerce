import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // if (loading) {
  //   return <p>Loading</p>;
  // }
  if (user) {
    return children;
  }
  return (
    <Navigate
      to="/"
      state={{ from: location, showModal: true }}
      replace
    ></Navigate>
  );
};

export default PrivateRoute;
