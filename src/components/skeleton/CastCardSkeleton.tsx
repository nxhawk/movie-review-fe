import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const CastCardSkeleton = () => {
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
          520: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
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
        {Array.from(new Array(15)).map((_, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative" }}>
              <Skeleton variant="rounded" style={{ height: "15rem", width: "100%" }} />
              <Skeleton variant="rounded" style={{ height: "1rem", width: "100%", marginTop: "8px" }} />
              <Skeleton variant="rounded" style={{ height: "1rem", width: "100%", marginTop: "8px" }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default CastCardSkeleton;
