import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/form/LoginForm";
import SocialLogin from "../components/SocialLogin";
import { AuthQueryConfig, IFullUser } from "../types/user.type";
import useQueryString from "../hooks/useQueryString";
import { setToken } from "../utils/helper";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import path from "../constants/path";
import userApi from "../api/base/user.api";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

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
        const response: IFullUser = await userApi.profile();
        // set current user
        changeAuth({ ...response });
        toast.success("Login successfully");
        navigate(path.HOME);
      } catch (err) {
        toast.error("AcessToken has expired");
        navigate(path.LOGIN, { replace: true });
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

  return (
    <DocumentMeta {...metadata.loginMeta}>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "85vh", marginBottom: "20px", marginTop: "5px" }}
        spacing={4}
      >
        <Grid item xs={11}>
          {/* Login form */}
          <LoginForm />
          <div
            className="or-divider"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "20px",
            }}
          >
            <span className="divider-line" style={{ flexGrow: 1, height: "1px", background: "#ccc" }}></span>
            <span className="divider-text" style={{ margin: "0 16px", color: "#5b5c55", fontWeight: "600" }}>
              Or continue with
            </span>
            <span className="divider-line" style={{ flexGrow: 1, height: "1px", background: "#ccc" }}></span>
          </div>

          <SocialLogin />
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default LogInPage;
