import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const MovieCardSkeleton = () => {
  return (
    <Grid container wrap="nowrap" overflow={"hidden"}>
      {Array.from(new Array(6)).map((_, index) => (
        <Box key={index} sx={{ width: 230, marginRight: 2, position: "relative" }}>
          <Skeleton variant="rounded" width={230} style={{ height: "calc(160px * 2.2)" }} />
          <div className="bottom-8 absolute left-2 flex items-center justify-center text-center">
            <Skeleton variant="circular" width={60} height={60} className="absolute" sx={{ bgcolor: "grey.400" }} />
            <Typography
              width={60}
              height={60}
              color="white"
              fontWeight={"bold"}
              fontSize={"1.2em"}
              className="flex items-center justify-center z-10"
            >
              NR
            </Typography>
          </div>
        </Box>
      ))}
    </Grid>
  );
};

export default MovieCardSkeleton;
