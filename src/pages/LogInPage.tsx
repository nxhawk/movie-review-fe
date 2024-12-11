import { Grid } from "@mui/material";
import LoginForm from "../components/form/LoginForm";
import SocialLogin from "../components/SocialLogin";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

const LogInPage = () => {
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
