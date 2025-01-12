import React, { Suspense, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getTeaserYoutubeKey } from "../../utils/helper";
import { MovieTrailer } from "../../types/movie.type";

type Props = {
  movie: MovieTrailer;
  open: boolean;
  onClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: theme.spacing(1),
    maxHeight: `100%`,
    backgroundColor: "#000",
    color: "#fff",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0.2),
    backgroundColor: "#000",
    color: "#fff",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#000",
    color: "#fff",
  },
}));

const WatchTrailerDialog = ({ movie, open, onClose }: Props) => {
  const vidRef = React.useRef<HTMLIFrameElement>(null);
  const [url, setUrl] = React.useState("");
  const [videoType, setVideoType] = React.useState("");

  useEffect(() => {
    if (movie.trailers && movie.trailers.length > 0) {
      const video = getTeaserYoutubeKey(movie.trailers);
      setVideoType(video.type);
      setUrl(`https://www.youtube.com/embed/${video.key}?enablejsapi=1`);
    }
  }, [movie]);

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xl">
      <DialogTitle fontWeight={"bold"} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Play {videoType}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Suspense
          fallback={
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="secondary" />
            </Box>
          }
        >
          <iframe
            ref={vidRef}
            className="w-full aspect-video self-stretch min-h-[520px]"
            src={url}
            frameBorder="0"
            title="Overview Video"
            aria-hidden="true"
            allowFullScreen
          />
        </Suspense>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default WatchTrailerDialog;
