import { Typography, useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const AboutUserSkeleton = () => {
  const matches = useMediaQuery("(min-width:680px)");

  return (
    <div className="flex items-center gap-10">
      <Skeleton variant="circular" width={matches ? 150 : 0} height={matches ? 150 : 0} sx={{ bgcolor: "grey.700" }} />
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Skeleton
            variant="circular"
            width={matches ? 0 : 80}
            height={matches ? 0 : 80}
            sx={{ bgcolor: "grey.700" }}
          />
          <Skeleton
            variant="rounded"
            width={matches ? 300 : 120}
            height={matches ? 30 : 45}
            sx={{ bgcolor: "grey.700" }}
          />
        </div>
        <div className="flex items-center space-x-4 max-md:justify-center">
          <div className="flex text-center">
            <Skeleton variant="circular" width={60} height={60} className="absolute" sx={{ bgcolor: "grey.700" }} />
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
          <div className="space-y-2">
            <Skeleton variant="rounded" width={62} height={15} sx={{ bgcolor: "grey.700" }} />
            <Skeleton variant="rounded" width={65} height={15} sx={{ bgcolor: "grey.700" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUserSkeleton;
