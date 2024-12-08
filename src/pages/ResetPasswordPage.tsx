import { Grid } from "@mui/material";
import React from "react";
import ResetPasswordForm from "../components/form/ResetPasswordForm";

function ResetPasswordPage() {
  React.useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <Grid container justifyContent="center" alignItems="center" paddingX={2} minHeight={"350px"}>
      <Grid item xs={11}>
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
}

export default ResetPasswordPage;
