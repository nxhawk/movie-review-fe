import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Movie } from "../../types/movie.type.ts";
import UserScore from "./UserScore.tsx";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Link } from "react-router-dom";
import dynamicPath from "../../constants/dynamicPath.ts";

const MovieSimpleCard = ({ movie }: { movie: Movie }) => {
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);

  return (
    <Link to={dynamicPath.MOVIE_DETAILS(movie.id)} className="min-w-60">
      <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
          background: "#dbdbdb",
          overflow: "hidden",
          borderRadius: "15px",
        }}
      >
        <CardActionArea disableRipple sx={{ minHeight: 0, backgroundColor: "#032541" }}>
          <div style={{ height: "calc(150px * 2.2)", overflow: "hidden" }}>
            <CardMedia
              component="img"
              title={movie.title}
              alt={movie.title}
              image={
                movie.poster_path ? `${tmdbConfig.imageOriginalURL}/${movie.poster_path}` : tmdbConfig.defaultMovieImg
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <CardContent>
            <Box sx={{ position: "absolute", top: "285px", left: "5px" }}>
              <UserScore point={Math.round(movie.vote_average * 10)} />
            </Box>
            <Typography
              noWrap
              variant="h5"
              title={movie.title}
              sx={{ color: "white", fontWeight: "bold", marginTop: "10px", fontSize: "medium" }}
            >
              {movie.title}
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: "gray", fontSize: "small", marginTop: "5px" }}>
              {formattedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MovieSimpleCard;
