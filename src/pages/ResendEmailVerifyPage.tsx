import { Grid } from "@mui/material";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import ResendEmailVerifyForm from "../components/form/ResendEmailVerifyForm";

const ResendEmailVerifyPage = () => {
  return (
    <DocumentMeta {...metadata.resendEmailVerifyMeta}>
      <Grid container justifyContent="center" paddingX={2} minHeight={"350px"}>
        <Grid item xs={11}>
          <ResendEmailVerifyForm />
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default ResendEmailVerifyPage;
