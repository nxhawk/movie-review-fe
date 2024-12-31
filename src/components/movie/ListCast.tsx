import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../../api/tmdb/movie.api";
import { ActorsOfMovie } from "../../types/actor.type";
import MovieActorCredit from "./MovieActorCredit";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CastCardSkeleton from "../skeleton/CastCardSkeleton";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  movieId: string | number;
};

const ListCast = ({ movieId }: Props) => {
  const [actors, setActors] = React.useState<ActorsOfMovie | null>(null);
  const [haveData, setHaveData] = React.useState(false);

  const getCastOfMovieQuery = useQuery({
    queryKey: ["casts-movie", movieId],
    queryFn: async () => {
      const response: ActorsOfMovie = await movieApi.getMovieCredit(movieId!);
      setActors(response);
      setHaveData(response.cast.length > 0);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <Grid container padding={{ xs: 2, md: 3 }}>
      {/* title */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Top Billed Cast
        </Typography>
        {haveData && (
          <Link
            to={dynamicPath.FULL_CAST(movieId)}
            className="flex font-medium items-center text-gray-700 hover:text-black"
          >
            View All
            <KeyboardArrowRightIcon />
          </Link>
        )}
      </Box>

      {/* Carousel */}
      {getCastOfMovieQuery.isFetching || getCastOfMovieQuery.isLoading ? (
        <CastCardSkeleton />
      ) : (
        <>
          {haveData ? (
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
                  spaceBetween: 12,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 12,
                },
                1280: {
                  slidesPerView: 8,
                  spaceBetween: 12,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {actors?.cast?.slice(0, 15)?.map((act) => (
                <SwiperSlide key={act.id}>
                  <MovieActorCredit actor={act} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="my-3">We don&apos;t have any cast added to this movie. You can help by adding some!</div>
          )}
        </>
      )}
    </Grid>
  );
};

export default ListCast;
