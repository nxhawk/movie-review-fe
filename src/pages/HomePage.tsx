import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

const HomePage = () => {
  const { auth } = React.useContext(AuthContext)!;

  return (
    <DocumentMeta {...metadata.homeMeta}>
      <div className="text-xl min-h-screen">
        {auth?.name ? `Hello ${auth.name}` : "Please log in to use our services"}
      </div>
    </DocumentMeta>
  );
};

export default HomePage;
