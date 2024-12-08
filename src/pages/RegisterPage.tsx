import React from "react";
import { Grid } from "@mui/material";
import RegisterForm from "../components/form/RegisterForm";
import SocialLogin from "../components/SocialLogin";
import MemberBenefit from "../components/MemberBenefit";

const RegisterPage = () => {
  React.useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ minHeight: "85vh", marginBottom: "25px", marginTop: "5px" }}
      paddingX={{ xs: 0, sm: 4 }}
      spacing={4}
      flexWrap={"wrap-reverse"}
    >
      <Grid item xs={11} sm={5} md={4} lg={3}>
        <MemberBenefit />
      </Grid>
      <Grid item xs={11} sm={7} md={8} lg={9}>
        {/* Register form */}
        <RegisterForm />
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
  );
};

export default RegisterPage;
