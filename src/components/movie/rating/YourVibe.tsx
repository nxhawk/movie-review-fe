import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import SliderRating from "./SliderRating";
import UserMood from "./UserMood";
import DoneIcon from "@mui/icons-material/Done";
import { AuthContext } from "../../../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import ratingApi from "../../../api/base/rating.api";
import { IRatingReq, IRatingRes } from "../../../types/rating.type";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getRatingTextColor } from "../../../utils/helper";
import UserCutMood from "./UserCutMood";

type Props = {
  movieId: number | string;
  point: number;
  title: string;
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 12,
    maxWidth: 220,
    lineHeight: 1.5,
  },
}));

const BootstrapButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: "bold",
  padding: "5px 12px",
  borderRadius: 100,
  transition: "all .3s ease",
  lineHeight: 1.5,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      style={{ transitionDuration: ".6s", transitionTimingFunction: "ease-in-out" }}
    />
  );
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: theme.spacing(1),
  },
}));

const YourVibe = ({ movieId, point, title }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState<number>(0);
  const [mood, setMood] = React.useState<number[]>([...Array(7).fill(-1)]);
  const { auth } = React.useContext(AuthContext)!;

  const isHaveVibeRating = React.useMemo(() => rating > 0 || mood.some((m) => m !== -1), [mood, rating]);
  const isHaveMood = React.useMemo(() => mood.some((m) => m !== -1), [mood]);

  const ratingMutation = useMutation({
    mutationFn: (body: IRatingReq) => ratingApi.updateRating(movieId, body),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Rating submitted successfully");
    },
  });

  const getRatingQuery = useQuery({
    queryKey: ["rating", movieId],
    queryFn: async () => {
      const response: IRatingRes = await ratingApi.getRating(movieId!);
      setRating(response.rating);
      setMood(response.mood);
      return response;
    },
    enabled: Boolean(movieId),
    gcTime: 0,
  });

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setRating(newValue as number);
  };

  const handleSubmitRating = () => {
    // Submit rating and mood
    ratingMutation.mutate({ rating, mood });
  };

  React.useEffect(() => {
    if (!open) {
      setRating(0);
      setMood([...Array(7).fill(-1)]);
    }
    getRatingQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <BootstrapButton
        variant="contained"
        onClick={() => setOpen(true)}
        endIcon={
          !isHaveVibeRating && (
            <BootstrapTooltip
              title={
                auth
                  ? "Welcome to Vibes, CineMatch's new rating system! For more information, visit the contribution bible."
                  : "Login to use CineMatch's new rating system."
              }
              arrow
              placement="right"
            >
              <InfoIcon />
            </BootstrapTooltip>
          )
        }
        className="hover:scale-105"
      >
        {isHaveVibeRating ? (
          rating > 0 ? (
            <p className="max-sm:text-sm">
              Your Vibe <span style={{ color: getRatingTextColor(rating) }}>{rating}</span>%
            </p>
          ) : (
            "Your Vibe"
          )
        ) : (
          "What's your Vibe?"
        )}
        {isHaveVibeRating && <div className="inline-block ml-2 mr-5 h-6 w-px bg-white/30" />}
        {isHaveMood && <UserCutMood mood={mood} />}
      </BootstrapButton>
      <BootstrapDialog
        open={auth != null && open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-rating-description"
      >
        <DialogContent className="custom-scrollbar-w">
          <SliderRating title={title} rating={rating} handleChange={handleChange} point={point} />
          <UserMood title={title} mood={mood} setMood={setMood} />
          <div className="h-14"></div>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 10,
            top: 10,
            color: theme.palette.grey[900],
          })}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<DoneIcon fontSize="small" />}
          sx={{
            position: "absolute",
            right: 28,
            bottom: 15,
            borderRadius: 100,
            fontSize: 16,
            fontWeight: "bold",
          }}
          disabled={ratingMutation.isPending}
          onClick={handleSubmitRating}
        >
          {ratingMutation.isPending ? (
            <CircularProgress size={30} style={{ color: "white" }} />
          ) : (
            <div>I&apos;m Done</div>
          )}
        </Button>
      </BootstrapDialog>
    </div>
  );
};

export default YourVibe;
