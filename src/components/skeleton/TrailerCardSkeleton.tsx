import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const TrailerCardSkeleton = () => {
  return (
    <Grid container wrap="nowrap" overflow={"hidden"} className="pb-5 px-5 md:px-10">
      {Array.from(new Array(6)).map((_, index) => (
        <Box key={index} sx={{ width: 300, marginRight: 1.6, position: "relative" }}>
          <Skeleton
            variant="rounded"
            width={300}
            style={{ height: "180px", borderRadius: 20 }}
            sx={{ bgcolor: "grey.500" }}
          />
          <div className="flex items-center justify-center flex-col">
            <Skeleton width={200} variant="text" height={30} sx={{ bgcolor: "grey.500" }} />
            <Skeleton width={100} variant="text" height={20} sx={{ bgcolor: "grey.500" }} />
          </div>
        </Box>
      ))}
    </Grid>
  );
};

export default TrailerCardSkeleton;
