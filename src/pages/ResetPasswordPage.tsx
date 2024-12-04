import { Grid } from "@mui/material";
import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage() {
  React.useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={5} sx={{ pt: "100px" }}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPasswordPage;
