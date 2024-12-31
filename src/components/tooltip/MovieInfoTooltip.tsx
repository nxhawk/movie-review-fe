import React from "react";
import circleSelected from "../../assets/images/circle-selected.svg";
import circleEmpty from "../../assets/images/circle-empty.svg";
import { CutCredit } from "../../types/movie.type";
import { ClickAwayListener, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  movie: CutCredit;
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    maxWidth: 534,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

const MovieInfoTooltip = ({ movie }: Props) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setOpen(false);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <BootstrapTooltip
          onClose={() => setOpen(false)}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <div className="flex gap-5 p-2">
              <LazyLoadImage
                alt={movie.title}
                src={movie.poster_path ? `${tmdbConfig.imageW200URL}${movie.poster_path}` : tmdbConfig.defaultMovieImg}
                className="rounded-lg w-[110px] h-[160px] object-cover"
              />

              <div>
                <div className="flex items-center gap-2">
                  <Link to={dynamicPath.MOVIE_DETAILS(movie.id)}>
                    <Typography variant="h6" fontWeight={"bold"} className="line-clamp-1">
                      {movie.title}
                    </Typography>
                  </Link>
                  <div className="bg-[#01b4ff] rounded px-2 py-1 flex items-center gap-0.5">
                    <StarIcon sx={{ fontSize: 12 }} />
                    {movie.vote_average}
                  </div>
                </div>
                <Typography variant="body2" className="line-clamp-2">
                  {movie.overview}
                </Typography>
              </div>
            </div>
          }
          slotProps={{
            popper: {
              disablePortal: true,
            },
          }}
        >
          <button
            onMouseEnter={() => setIsSelected(true)}
            onMouseLeave={() => setIsSelected(false)}
            className="mt-0.5 h-fit"
            onClick={() => setOpen(true)}
          >
            {isSelected ? (
              <img src={circleSelected} alt="circle-selected" className="w-[16px] h-[16px]" />
            ) : (
              <img src={circleEmpty} alt="circle-empty" className="w-[16px] h-[16px]" />
            )}
          </button>
        </BootstrapTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default MovieInfoTooltip;
