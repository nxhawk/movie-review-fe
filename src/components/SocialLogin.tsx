import { Box } from "@mui/material";
import facebookLogo from "../assets/images/logos/facebook.png";
import googleLogo from "../assets/images/logos/google.png";
import { Link } from "react-router-dom";

const SocialLogin = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Link to={import.meta.env.VITE_FACEBOOK_LOGIN_URL}>
          <img
            src={facebookLogo}
            style={{
              objectFit: "scale-down",
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              cursor: "pointer",
              marginRight: "32px",
            }}
          ></img>
        </Link>

        <Link to={import.meta.env.VITE_GOOGLE_LOGIN_URL}>
          <img
            src={googleLogo}
            style={{
              objectFit: "scale-down",
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              cursor: "pointer",
            }}
          ></img>
        </Link>
      </Box>
    </>
  );
};

export default SocialLogin;
