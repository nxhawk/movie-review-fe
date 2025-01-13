import { useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const MovieDetailSkeleton = () => {
  const matches = useMediaQuery("(min-width:780px)");

  return (
    <div className="flex flex-col md:flex-row py-5 md:px-7 items-center">
      <Skeleton variant="rectangular" width={matches ? 320 : "80%"} height={matches ? 420 : 600} />
      <div className="flex-1 max-md:w-full px-3 md:ml-6 space-y-4">
        <div className="w-full">
          <Skeleton variant="text" height={60} width={"80%"} />
          <Skeleton variant="text" height={20} width={"30%"} />
          <Skeleton variant="text" height={20} width={"50%"} />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" height={70} width={70} />
          <Skeleton variant="rectangular" height={40} width={200} sx={{ borderRadius: 50 }} />
        </div>
        <Skeleton variant="rectangular" height={100} width={"100%"} />
        <div>
          <div className="flex space-x-10">
            <Skeleton variant="rectangular" height={80} width={"100%"} />
            <Skeleton variant="rectangular" height={80} width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;
