import { Grid } from "@mui/material";
import ResetPasswordForm from "../components/form/ResetPasswordForm";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

function ResetPasswordPage() {
  return (
    <DocumentMeta {...metadata.registerMeta}>
      <Grid container justifyContent="center" alignItems="center" paddingX={2} minHeight={"350px"}>
        <Grid item xs={11}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </DocumentMeta>
  );
}

export default ResetPasswordPage;
