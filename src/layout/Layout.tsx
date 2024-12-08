import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main style={{ flex: 1, marginTop: "64px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
