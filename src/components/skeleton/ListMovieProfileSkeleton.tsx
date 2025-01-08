import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";

const ListMovieProfileSeleton = ({ isGridView }: { isGridView: boolean }) => {
  return (
    <>
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
          {Array.from(new Array(5)).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 my-5">
          <Box sx={{ position: "relative" }}>
            {Array.from(new Array(5)).map((_, index) => (
              <div key={index}>
                <div className="max-sm:hidden flex gap-2 items-center">
                  <Skeleton variant="rounded" style={{ height: "4rem", width: "1rem", marginTop: "8px" }} />
                  <Skeleton variant="rounded" style={{ height: "4rem", width: "100%", marginTop: "8px" }} />
                </div>
                <div className="sm:hidden flex gap-2 items-center">
                  <Skeleton variant="rounded" style={{ height: "4rem", width: "100%", marginTop: "8px" }} />
                </div>
              </div>
            ))}
          </Box>
        </div>
      )}
    </>
  );
};

export default ListMovieProfileSeleton;
