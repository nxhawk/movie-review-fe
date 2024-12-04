import React from "react";
import { Grid } from "@mui/material";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  React.useEffect(() => {
    document.title = "Forgot password?";
  }, []);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={5} sx={{ pt: "100px" }}>
          <ForgotPasswordForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPasswordPage;
