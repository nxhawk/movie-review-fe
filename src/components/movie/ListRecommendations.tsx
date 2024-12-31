import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../api/tmdb/movie.api";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import { Movie } from "../../types/movie.type";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate } from "../../utils/dateFormat";
import { cn } from "../../utils/cn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { motion } from "motion/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import MovieRecommendationSkeleton from "../skeleton/MovieRecommendationSkeleton";
import { Pagination } from "../../types/response.type";

type Props = {
  movieId: string;
  title: string;
};

const MovieRecomendations = ({ movie }: { movie: Movie }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {/* Image */}
        <Link to={dynamicPath.MOVIE_DETAILS(movie.id)} title={movie.title}>
          <LazyLoadImage
            alt={movie.title}
            src={movie.poster_path ? `${tmdbConfig.imageW500URL}/${movie.poster_path}` : tmdbConfig.defaultMovieImg}
            className="h-40 w-full object-cover rounded-lg"
          />
        </Link>

        {/* Date */}
        <div
          className={cn(
            "hidden transition-all ease-out absolute bottom-0 left-0 p-2 w-full",
            show ? "flex items-center justify-between" : "hidden",
          )}
          style={{ backgroundColor: "rgba(255, 255, 255, .9)" }}
        >
          <div className="flex items-center gap-1 text-sm">
            <EventNoteIcon sx={{ fontSize: 16 }} />
            <div>{movie.release_date ? formatDate(movie.release_date) : "-"}</div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <StarIcon sx={{ fontSize: 16 }} />
            <FavoriteIcon sx={{ fontSize: 16 }} />
            <BookmarkIcon sx={{ fontSize: 16 }} />
          </div>
        </div>
      </div>
      {/* movie title and rating */}
      <div className="mt-2 flex items-center justify-between">
        <Link to={dynamicPath.MOVIE_DETAILS(movie.id)}>
          <p className="line-clamp-1">{movie.title}</p>
        </Link>
        <p className="">{Math.round(movie.vote_average * 10)}%</p>
      </div>
    </div>
  );
};

const ListRecommendations = ({ movieId, title }: Props) => {
  const [movies, setMovies] = React.useState<Pagination<Movie> | null>(null);
  const [haveData, setHaveData] = React.useState(false);

  const getRecommendationsMovieQuery = useQuery({
    queryKey: ["recommendations-movie", movieId],
    queryFn: async () => {
      const response: Pagination<Movie> = await movieApi.getRecommendations(movieId!);
      setMovies(response);
      setHaveData(response.results.length > 0);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <Grid container padding={{ xs: 2, md: 3 }}>
      {/* title */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Recommendations
        </Typography>
      </Box>

      {/* Carousel */}
      {getRecommendationsMovieQuery.isFetching || getRecommendationsMovieQuery.isLoading ? (
        <MovieRecommendationSkeleton />
      ) : (
        <>
          {haveData ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                className="my-3"
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {movies?.results.slice(0, 20)?.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <MovieRecomendations movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ) : (
            <div className="my-3">
              We don&apos;t have enough data to suggest any movies based on {title}. You can help by rating movies
              you&apos;ve seen.
            </div>
          )}
        </>
      )}
    </Grid>
  );
};

export default ListRecommendations;
