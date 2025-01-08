import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import WatchlistForm from "../../components/form/WatchlistForm";
import { Box, CircularProgress, Grid } from "@mui/material";
import { IWatchList, IWatchListDetails } from "../../types/watchlist.type";
import watchlistApi from "../../api/base/watchlist.api";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResourceNotFound from "../../components/common/ResourceNotFound";

const EditWatchListPage = () => {
  const { watchlistId } = useParams();
  const [watchlist, setWatchlist] = React.useState<IWatchListDetails | null>(null);

  const getWatchListDetailQuery = useQuery({
    queryKey: ["watchlist-detail", watchlistId],
    queryFn: async () => {
      const response: IWatchListDetails = await watchlistApi.getDetails(watchlistId!);
      metadata.editWatchListMeta.title = `${response.name} - Watch List Edit - CineMatch`;
      setWatchlist(response);
      return response;
    },
    enabled: Boolean(watchlistId),
  });

  if (getWatchListDetailQuery.isError) {
    metadata.watchListDetailMeta.title = `Page Not Found - Watch List Details - CineMatch`;
  }

  return (
    <DocumentMeta {...metadata.editWatchListMeta}>
      {getWatchListDetailQuery.isFetching || getWatchListDetailQuery.isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: "10px",
            minHeight: "500px",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : watchlist ? (
        <Grid
          container
          justifyContent="center"
          style={{ minHeight: "85vh", marginBottom: "20px", marginTop: "5px" }}
          spacing={4}
        >
          <Grid item xs={11}>
            <WatchlistForm isUpdate data={watchlist as IWatchList} id={watchlist.id} />
          </Grid>
        </Grid>
      ) : (
        <ResourceNotFound />
      )}
    </DocumentMeta>
  );
};

export default EditWatchListPage;
