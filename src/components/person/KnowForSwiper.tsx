import { MovieCast } from "../../types/movie.type";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  movies: MovieCast[];
};

const KnowForSwiper = ({ movies }: Props) => {
  return (
    <>
      {movies.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          className="my-3"
          slidesPerView={2}
          spaceBetween={12}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            680: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {/* TODO: Priority movie */}
          {movies.slice(0, 10)?.map((movie) => (
            <SwiperSlide key={movie.id} className="flex flex-col items-center gap-3">
              <Link to={dynamicPath.MOVIE_DETAILS(movie.id)} title={movie.title}>
                <LazyLoadImage
                  alt={movie.title}
                  src={
                    movie.poster_path ? `${tmdbConfig.imageW500URL}/${movie.poster_path}` : tmdbConfig.defaultMovieImg
                  }
                  className="h-60 w-full object-cover rounded-lg"
                />
              </Link>
              <Link to={dynamicPath.MOVIE_DETAILS(movie.id)}>
                <Typography variant="body2" className="text-center mt-2 hover:text-blue-500">
                  {movie.title}
                </Typography>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="my-3"> - </div>
      )}
    </>
  );
};

export default KnowForSwiper;
