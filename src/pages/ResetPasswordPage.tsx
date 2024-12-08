import { Grid } from "@mui/material";
import React from "react";
import ResetPasswordForm from "../components/form/ResetPasswordForm";

function ResetPasswordPage() {
  React.useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" paddingX={2}>
        <Grid item xs={12} sm={8} lg={5} sx={{ pt: "100px" }}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPasswordPage;
