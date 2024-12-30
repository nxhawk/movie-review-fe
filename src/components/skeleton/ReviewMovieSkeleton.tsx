import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const ReviewMovieSkeleton = () => {
  return (
    <Box sx={{ position: "relative", marginTop: 2 }}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-1">
          <Skeleton variant="rounded" style={{ height: "1rem", width: "40%" }} />
          <Skeleton variant="rounded" style={{ height: "1rem", width: "60%" }} />
        </div>
      </div>
      <Skeleton variant="rounded" style={{ height: "15rem", width: "100%", marginTop: 12 }} />
    </Box>
  );
};

export default ReviewMovieSkeleton;
