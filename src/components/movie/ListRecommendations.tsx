import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../api/base/movie.api";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import { Movie } from "../../types/movie.type";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate } from "../../utils/dateFormat";
import { cn } from "../../utils/cn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { motion } from "motion/react";
import MovieRecommendationSkeleton from "../skeleton/MovieRecommendationSkeleton";
import { buildQueryString, getCorrectId } from "../../utils/helper";
import TextGradient from "../common/TextGradient";
import { ILlmSearch } from "../../types/llm.type";
import llmApi from "../../api/base/llm.api";

type Props = {
  movieId: string;
  title: string;
  movie: Movie;
};

const MovieRecomendations = ({ movie }: { movie: Movie }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {/* Image */}
        <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))} title={movie.title}>
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
        </div>
      </div>
      {/* movie title and rating */}
      <div className="mt-2 flex items-center justify-between">
        <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))}>
          <p className="line-clamp-1">{movie.title}</p>
        </Link>
        <p className="">{Math.round(movie.vote_average * 10)}%</p>
      </div>
    </div>
  );
};

const ListRecommendations = ({ movieId, title, movie }: Props) => {
  const [movies, setMovies] = React.useState<Movie[] | null>(null);
  const [haveData, setHaveData] = React.useState(false);
  const [subType, setSubType] = React.useState("genres");

  const getRecommendationsMovieQuery = useQuery({
    queryKey: ["recommendations-movie", movieId, subType],
    queryFn: async () => {
      const response: ILlmSearch =
        subType === "genres"
          ? await movieApi.getRecommendations(movieId!)
          : await llmApi.searchMovie(buildQueryString(movie), 20, 0.5);
      setMovies(response.data);
      setHaveData(response.data.length > 0);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <Grid container padding={{ xs: 2, md: 3 }} flexDirection="column">
      {/* title */}

      <div className="flex items-center gap-4 mb-2">
        <Typography color="primary.main" fontWeight={"bold"} fontSize={{ xs: "1.2em", md: "1.8em" }}>
          Recommendations
        </Typography>
        <Box className="relative border-2 border-cyan-950 rounded-full flex w-fit">
          <Box
            className="absolute w-[100px] h-[32px] rounded-full transition-all duration-500 ease"
            bgcolor={"primary.main"}
            style={{
              transform: `translateX(${subType === "genres" ? 0 : "100px"})`,
            }}
          />
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "32px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.1s ease 0.1s",
            }}
            onClick={() => setSubType("genres")}
          >
            {subType === "genres" ? <TextGradient text="Genres" /> : "Genres"}
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "32px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.1s ease 0.1s",
            }}
            onClick={() => setSubType("vectors")}
          >
            {subType === "vectors" ? <TextGradient text="Vectors" /> : "Vectors"}
          </Button>
        </Box>
      </div>

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
                {movies?.slice(0, 20)?.map((movie) => {
                  if (movie.tmdb_id.toString() === movieId) return <></>;
                  return (
                    <SwiperSlide key={movie.id}>
                      <MovieRecomendations movie={movie} />
                    </SwiperSlide>
                  );
                })}
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
