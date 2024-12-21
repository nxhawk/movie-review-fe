import { Container, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const AllCastSkeleton = () => {
  return (
    <Container maxWidth="xl" className="flex flex-col sm:flex-row my-6">
      {/* left */}
      <div className="flex-1">
        <div className="flex items-end gap-2">
          <Typography variant="h5">Cast</Typography>
        </div>
        {Array.from(new Array(4)).map((_, index) => (
          <div key={index} className="flex items-center gap-5 my-3">
            <Skeleton variant="rounded" width={60} height={60} />
            <div>
              <Skeleton width={100} />
              <Skeleton width={150} />
            </div>
          </div>
        ))}
      </div>
      {/* right */}
      <div className="flex-1">
        <div className="flex items-end gap-2">
          <Typography variant="h5">Crew</Typography>
        </div>
        {Array.from(new Array(5)).map((_, index) => (
          <div key={index} className="flex items-center gap-5 my-3">
            <Skeleton variant="rounded" width={60} height={60} />
            <div>
              <Skeleton width={100} />
              <Skeleton width={150} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AllCastSkeleton;
