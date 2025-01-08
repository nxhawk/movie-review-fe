import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import WatchlistForm from "../../components/form/WatchlistForm";
import { Grid } from "@mui/material";

const NewWatchListPage = () => {
  return (
    <DocumentMeta {...metadata.addNewWatchListMeta}>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "85vh", marginBottom: "20px", marginTop: "5px" }}
        spacing={4}
      >
        <Grid item xs={11}>
          <WatchlistForm />
        </Grid>
      </Grid>
    </DocumentMeta>
  );
};

export default NewWatchListPage;
