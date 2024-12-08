import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = () => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <>
      <AppBar />
      <main style={{ flex: 1, marginTop: matches ? "52px" : "64px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
