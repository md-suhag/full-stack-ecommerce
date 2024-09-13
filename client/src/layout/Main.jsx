import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {/* {loading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </>
      {/* )} */}
    </>
  );
};

export default Main;
