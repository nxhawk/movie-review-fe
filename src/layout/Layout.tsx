import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import Chatbox from "../components/chatbox/Chatbox";

const Layout = () => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <AppBar />
      <Box sx={{ backgroundColor: "primary.main", width: "100%", height: matches ? "52px" : "64px" }}></Box>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Chatbox */}
      <Chatbox />
    </>
  );
};

export default Layout;
