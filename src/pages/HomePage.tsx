import React from "react";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const { auth } = React.useContext(AuthContext)!;

  return (
    <div className="text-xl min-h-screen">
      {auth?.name ? `Hello ${auth.name}` : "Please log in to use our services"}
    </div>
  );
};

export default HomePage;
