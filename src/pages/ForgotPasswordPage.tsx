import React from "react";
import { Grid } from "@mui/material";
import ForgotPasswordForm from "../components/form/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  React.useEffect(() => {
    document.title = "Forgot password?";
  }, []);

  return (
    <Grid container justifyContent="center" paddingX={2} minHeight={"350px"}>
      <Grid item xs={11}>
        <ForgotPasswordForm />
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
