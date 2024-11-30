import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SocialLogin from "../components/SocialLogin";
import { AuthQueryConfig, IFullUser } from "../types/user";
import useQueryString from "../hooks/useQueryString";
import { setToken } from "../utils/helper";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { profile } from "../api/apiUser";

const LogInPage = () => {
  const { changeAuth } = React.useContext(AuthContext)!;
  const queryString: AuthQueryConfig = useQueryString();
  const queryConfig: AuthQueryConfig = {
    access_token: queryString.access_token || "",
    refresh_token: queryString.refresh_token || "",
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getProfile() {
      try {
        const response: IFullUser = await profile();
        // set current user
        changeAuth({ ...response });
        toast.success("Login successfully");
        navigate("/");
      } catch (err) {
        toast.error("AcessToken has expired");
        navigate("/login", { replace: true });
      }
    }
    if (queryConfig.access_token && queryConfig.refresh_token) {
      // store token to local storage
      setToken(queryConfig.access_token, queryConfig.refresh_token);

      // check valid token and get profile information
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryConfig.access_token, queryConfig.refresh_token]);

  React.useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "85vh", marginBottom: "0px" }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "25px" }}>
          {/* Login form */}
          <LoginForm />
          {/* <Stack spacing={0.5} direction="row" useFlexGap flexWrap="wrap" justifyContent={"right"} marginTop={"16px"}>
            <Link to={"/forgot-password"} style={{ textDecoration: "none", color: "#0074D9" }}>
              Forgot password?
            </Link>
          </Stack> */}
          <div
            className="or-divider"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "25px",
            }}
          >
            <span className="divider-line" style={{ flexGrow: 1, height: "1px", background: "#ccc" }}></span>
            <span className="divider-text" style={{ margin: "0 16px", color: "#5b5c55", fontWeight: "600" }}>
              Or continue with
            </span>
            <span className="divider-line" style={{ flexGrow: 1, height: "1px", background: "#ccc" }}></span>
          </div>

          <SocialLogin />

          <Stack spacing={0.5} direction="row" useFlexGap flexWrap="wrap" justifyContent={"center"} marginTop={"16px"}>
            <Typography>Not a member yet?</Typography>
            <Link to={"/register"} style={{ textDecoration: "none", color: "#0074D9" }}>
              Register
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LogInPage;
