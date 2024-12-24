import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const KnowForSkeleton = () => {
  return (
    <Grid container wrap="nowrap" overflow={"hidden"}>
      <Swiper
        className="my-3 w-full"
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
        {Array.from(new Array(15)).map((_, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative" }}>
              <Skeleton variant="rounded" style={{ height: "13rem", width: "100%" }} />
              <Skeleton variant="rounded" style={{ height: "1.5rem", width: "100%", marginTop: "8px" }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default KnowForSkeleton;
