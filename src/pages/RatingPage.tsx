import { Typography } from "@mui/material";
import ButtonChangeStyleView from "../components/common/ButtonChangeStyleView";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ratingApi from "../api/base/rating.api";
import { IRated } from "../types/rating.type";
import ListMovieProfileSeleton from "../components/skeleton/ListMovieProfileSkeleton";
import MovieRatingCard from "../components/movie/MovieRatingCard";
import { GlobalContext } from "../contexts/GlobalContext";

const RatingPage = () => {
  const [listRated, setListRated] = React.useState<IRated[] | null>(null);
  const { isGridView } = React.useContext(GlobalContext)!;

  const getRatedListQuery = useQuery({
    queryKey: ["rated-list"],
    queryFn: async () => {
      const response: IRated[] = await ratingApi.getRatedMovies();
      setListRated(response);
      return response;
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Typography variant="h5">Movie đã đánh giá</Typography>
        <ButtonChangeStyleView />
      </div>
      {getRatedListQuery.isLoading || getRatedListQuery.isFetching ? (
        <ListMovieProfileSeleton isGridView={isGridView} />
      ) : (
        <>
          {listRated?.length === 0 && <div className="mt-2 text-xl">Bạn chưa thực hiện đánh giá nào.</div>}
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
              {listRated?.map((rated, idx) => (
                <div key={rated.movie.id}>
                  <MovieRatingCard
                    movie={rated.movie}
                    isGridView={isGridView}
                    index={idx + 1}
                    mood={rated.mood}
                    rating={rated.rating}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 my-5">
              {listRated?.map((rated, idx) => (
                <div key={rated.movie.id}>
                  <MovieRatingCard
                    movie={rated.movie}
                    isGridView={isGridView}
                    index={idx + 1}
                    mood={rated.mood}
                    rating={rated.rating}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RatingPage;
