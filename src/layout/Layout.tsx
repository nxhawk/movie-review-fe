import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main style={{ flex: 1, marginTop: "64px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
