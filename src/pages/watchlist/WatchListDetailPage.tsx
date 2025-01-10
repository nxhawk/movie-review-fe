import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import watchlistApi from "../../api/base/watchlist.api";
import metadata from "../../utils/metadata";
import { IWatchListDetails } from "../../types/watchlist.type";
import DocumentMeta from "react-document-meta";
import { Box, CircularProgress } from "@mui/material";
import ResourceNotFound from "../../components/common/ResourceNotFound";
import HeaderAuthor from "../../components/watchlist/HeaderAuthor";
import ButtonChangeStyleView from "../../components/common/ButtonChangeStyleView";
import MovieProfileCard from "../../components/movie/MovieProfileCard";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";

const WatchListDetailPage = () => {
  const { watchlistId } = useParams();
  const { auth } = React.useContext(AuthContext)!;

  const [watchlist, setWatchlist] = React.useState<IWatchListDetails | null>(null);
  const { isGridView } = React.useContext(GlobalContext)!;

  const getWatchListDetailQuery = useQuery({
    queryKey: ["watchlist-detail", watchlistId],
    queryFn: async () => {
      const response: IWatchListDetails = await watchlistApi.getDetails(watchlistId!);
      metadata.watchListDetailMeta.title = `${response.name} - Watch List Details - CineMatch`;
      setWatchlist(response);
      return response;
    },
    enabled: Boolean(watchlistId),
  });

  if (getWatchListDetailQuery.isError) {
    metadata.watchListDetailMeta.title = `Page Not Found - Watch List Details - CineMatch`;
  }

  return (
    <DocumentMeta {...metadata.watchListDetailMeta}>
      {getWatchListDetailQuery.isFetching || getWatchListDetailQuery.isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingY: "10px", minHeight: "500px", alignItems: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : watchlist ? (
        <>
          {/* Header Author */}
          <HeaderAuthor
            name={watchlist.name}
            email={watchlist.user.email}
            description={watchlist.description}
            watchListId={watchlist.id}
            isPublic={watchlist.isPublic}
            isAuthor={auth?.email ? auth.email === watchlist.user.email : false}
          />
          {/* List Movie in WatchList */}
          <div>
            <div className="flex items-center justify-center my-3">
              <ButtonChangeStyleView />
            </div>
            {/* List Movie */}
            {watchlist.movies && watchlist.movies.length > 0 ? (
              <div className="px-2 sm:px-10">
                {isGridView ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
                    {watchlist?.movies.map((movie, idx) => (
                      <div key={movie.id}>
                        <MovieProfileCard movie={movie} isGridView={isGridView} index={idx + 1} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 my-5">
                    {watchlist?.movies.map((movie, idx) => (
                      <div key={movie.id}>
                        <MovieProfileCard movie={movie} isGridView={isGridView} index={idx + 1} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-2 sm:px-10 mt-2 h-[100px] text-xl">Chưa có phim nào trong danh sách này.</div>
            )}
          </div>
        </>
      ) : (
        <ResourceNotFound />
      )}
    </DocumentMeta>
  );
};

export default WatchListDetailPage;
