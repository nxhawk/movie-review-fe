import { Grid } from "@mui/material";
import ForgotPasswordForm from "../components/form/ForgotPasswordForm";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";

const ForgotPasswordPage = () => {
  return (
    <DocumentMeta {...metadata.forgotPasswordMeta}>
      <Grid container justifyContent="center" paddingX={2} minHeight={"350px"}>
        <Grid item xs={11}>
          <ForgotPasswordForm />
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default ForgotPasswordPage;
