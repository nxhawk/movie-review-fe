import { Typography } from "@mui/material";
import favoriteApi from "../api/base/favorite.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IListFavorite } from "../types/favorite.type";
import MovieProfileCard from "../components/movie/MovieProfileCard";
import ButtonChangeStyleView from "../components/common/ButtonChangeStyleView";
import ListMovieProfileSeleton from "../components/skeleton/ListMovieProfileSkeleton";
import { GlobalContext } from "../contexts/GlobalContext";

const FavoriteMoviePage = () => {
  const [listFavorite, setListFavorite] = React.useState<IListFavorite | null>(null);
  const { isGridView } = React.useContext(GlobalContext)!;

  const getFavoriteListQuery = useQuery({
    queryKey: ["favorite-list"],
    queryFn: async () => {
      const response: IListFavorite = await favoriteApi.getFavoriteList();
      setListFavorite(response);
      return response;
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Typography variant="h5">Danh sách yêu thích</Typography>
        <ButtonChangeStyleView />
      </div>
      {getFavoriteListQuery.isLoading || getFavoriteListQuery.isFetching ? (
        <ListMovieProfileSeleton isGridView={isGridView} />
      ) : (
        <>
          {listFavorite?.movies && listFavorite?.movies.length > 0 ? (
            <>
              {isGridView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
                  {listFavorite?.movies.map((movie, idx) => (
                    <div key={movie.id}>
                      <MovieProfileCard movie={movie} isGridView={isGridView} index={idx + 1} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 my-5">
                  {listFavorite?.movies.map((movie, idx) => (
                    <div key={movie.id}>
                      <MovieProfileCard movie={movie} isGridView={isGridView} index={idx + 1} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mt-2 text-xl">Không có phim nào trong danh sách yêu thích.</div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteMoviePage;
