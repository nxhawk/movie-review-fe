import { CutCredit, ListCutCredit } from "../../types/movie.type";
import { Divider, Typography, Card } from "@mui/material";
import { getYear } from "date-fns";
import MovieInfoTooltip from "../tooltip/MovieInfoTooltip";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

const Credit = ({ movie }: { movie: CutCredit }) => {
  return (
    <div className="flex gap-8 py-2 px-5">
      <Typography variant="body2" className="w-5 text-center">
        {movie.release_date ? getYear(movie.release_date) : "—"}
      </Typography>

      {/* tooltip */}
      <div className="hidden sm:block">
        <MovieInfoTooltip movie={movie} />
      </div>

      <div>
        <Link to={dynamicPath.MOVIE_DETAILS(movie.id)}>
          <Typography variant="body1" fontWeight="bold" className="hover:text-[#01b4ff]">
            {movie.title}
          </Typography>
        </Link>
        {movie.character && movie.character.toLowerCase() != "self" && (
          <Typography variant="body2" className="flex gap-1">
            <span className="text-gray-500 ml-3">as</span>
            {movie.character}
          </Typography>
        )}
        {movie.job && (
          <Typography variant="body2" className="flex gap-1">
            <span className="text-gray-500 ml-3">...</span>
            {movie.job}
          </Typography>
        )}
      </div>
    </div>
  );
};
const CreditGroup = ({ group }: { group: ListCutCredit }) => {
  return (
    <>
      <div className="mt-4 flex justify-between items-center">
        <Typography variant="h6" fontWeight="bold">
          {group.name}
        </Typography>
      </div>
      <Card variant="outlined" className="py-2">
        {group.credits.map((movie, idx) => (
          <div key={movie.id}>
            {idx !== 0 &&
              movie.release_date &&
              getYear(group.credits[idx - 1].release_date) !== getYear(movie.release_date) && (
                <div className="my-2">
                  <Divider />
                </div>
              )}
            <Credit key={movie.id} movie={movie} />
          </div>
        ))}
      </Card>
    </>
  );
};

type Props = {
  credits: ListCutCredit[];
};

const CreditsList = ({ credits }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {credits.map((group, idx) => (
        <CreditGroup key={`${group.name}-${idx}`} group={group} />
      ))}
    </div>
  );
};

export default CreditsList;
