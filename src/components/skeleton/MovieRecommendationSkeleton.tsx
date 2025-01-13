import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const MovieRecommendationSkeleton = () => {
  return (
    <Grid container wrap="nowrap" overflow={"hidden"}>
      <Swiper
        className="my-3 w-full"
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
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {Array.from(new Array(8)).map((_, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative" }}>
              <Skeleton variant="rounded" style={{ height: "10.6rem", width: "100%" }} />
              <div className="flex items-center justify-between gap-3 mt-3">
                <Skeleton variant="rounded" style={{ height: "1rem", flexGrow: 2 }} />
                <Skeleton variant="rounded" style={{ height: "1rem", flexGrow: 1 }} />
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default MovieRecommendationSkeleton;
