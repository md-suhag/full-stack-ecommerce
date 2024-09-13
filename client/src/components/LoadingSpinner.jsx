import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
