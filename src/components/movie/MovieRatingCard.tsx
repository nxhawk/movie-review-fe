import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Movie } from "../../types/movie.type.ts";
import UserScore from "./UserScore.tsx";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCorrectId } from "../../utils/helper.ts";
import UserCutMood from "./rating/UserCutMood.tsx";
import ListStar from "./rating/ListStar.tsx";

type Props = {
  movie: Movie;
  isGridView?: boolean;
  index: number;
  mood: number[];
  rating: number;
};

const MovieRatingCard = ({ movie, index, mood, rating, isGridView = true }: Props) => {
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);

  return (
    <>
      {isGridView ? (
        <div>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
              overflow: "hidden",
              borderRadius: "15px",
            }}
          >
            <CardActionArea disableRipple sx={{ backgroundColor: "primary.main" }}>
              <div className="absolute top-2 left-2 z-100 cursor-default text-[#dee2e6]">
                <div>{index}</div>
              </div>
              <Link
                to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))}
                className="block"
                title={movie.title}
                style={{ height: "calc(120px * 2.2)", overflow: "hidden" }}
              >
                <LazyLoadImage
                  alt={movie.title}
                  src={
                    movie.poster_path
                      ? `${tmdbConfig.imageOriginalURL}/${movie.poster_path}`
                      : tmdbConfig.defaultMovieImg
                  }
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Link>
              <CardContent className="cursor-default">
                <Box sx={{ position: "absolute", top: "230px", left: "5px" }}>
                  <UserScore point={Math.round((movie.vote_average ? movie.vote_average : 0) * 10)} />
                </Box>
                <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))} className="block">
                  <Typography
                    noWrap
                    variant="h5"
                    sx={{ color: "white", fontWeight: "bold", marginTop: "10px", fontSize: "medium" }}
                  >
                    {movie.title}
                  </Typography>
                </Link>
                <Typography variant="body2" component="p" sx={{ color: "gray", fontSize: "small", marginTop: "5px" }}>
                  {formattedDate}
                </Typography>
                <div className="relative w-fit ml-2 sm:min-h-8 md:min-h-9">
                  <UserCutMood mood={mood} />
                </div>
                <ListStar rating={rating * 0.05} color="white" />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="hidden md:table-cell align-middle font-mono text-xl text-gray-400 bold pr-4 font-bold">
            {index}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap w-full sm:items-center text-left border md:rounded-s-md py-2 px-4 gap-2">
            <div className="flex-1">
              <Link
                to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))}
                className="inline-block hover:border-b-black border-white border-b"
              >
                <Typography fontWeight={"bold"} className="w-fit">
                  {movie.title}
                </Typography>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 md:items-center">
              <div className="flex gap-4 flex-nowrap">
                <UserCutMood mood={mood} className="bg-[#f7f7f7]" />
                <ListStar rating={rating * 0.05} />
              </div>
              <div className="flex gap-4 flex-nowrap">
                <div className="flex py-1 px-3 justify-center items-center rounded-full text-xs md:text-sm text-white bg-gradient-to-r from-[#fdc170] to-[#d93b63]">
                  Movie
                </div>
                <div className="flex py-1 px-3 justify-center items-center rounded-full text-xs w-[150px] md:text-sm text-white bg-[#032541]">
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieRatingCard;
