import { useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const CastDetailSkeleton = () => {
  const matches = useMediaQuery("(min-width:780px)");

  return (
    <div className="flex flex-col md:flex-row py-5 md:px-7 items-center">
      <Skeleton variant="rectangular" width={matches ? 300 : "80%"} height={matches ? 420 : 600} />
      <div className="flex-1 max-md:w-full px-3 md:ml-6 space-y-5">
        <div className="w-full">
          <Skeleton variant="text" height={60} width={"50%"} />
          <Skeleton variant="text" height={20} width={"50%"} />
          <Skeleton variant="text" height={20} width={"50%"} />
          <Skeleton variant="text" height={20} width={"30%"} />
        </div>
        <div>
          <Skeleton variant="text" height={32} width={120} />
          <div className="flex overflow-hidden gap-4 mt-2">
            {Array.from(new Array(matches ? 4 : 2)).map((_, index) => (
              <Skeleton variant="rectangular" key={index} height={matches ? 220 : 300} width={matches ? 120 : "100%"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastDetailSkeleton;
