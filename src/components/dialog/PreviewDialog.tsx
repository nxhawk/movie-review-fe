import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import React, { Suspense } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import movieApi from "../../api/tmdb/movie.api";
import { getTeaserYoutubeKey } from "../../utils/helper";

type Props = {
  movieId: number;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: theme.spacing(1),
    maxHeight: `100%`, // Giới hạn chiều cao tối đa của dialog
    backgroundColor: "#000", // Nền đen
    color: "#fff", // Chữ trắng
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0.2),
    backgroundColor: "#000", // Màu nền đen
    color: "#fff",
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: "#000", // Màu nền tiêu đề (nếu có)
    color: "#fff", // Màu chữ tiêu đề
  },
}));

const PreviewDialog = ({ movieId }: Props) => {
  const vidRef = React.useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [videoType, setVideoType] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const getVideo = async () => {
      setIsLoading(true);
      try {
        const res = await movieApi.getVideos(movieId);
        if (res?.results.length <= 0) throw new Error("No video found");
        const video = getTeaserYoutubeKey(res.results);
        setVideoType(video.type);
        setUrl(`https://www.youtube.com/embed/${video.key}?enablejsapi=1`);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getVideo();
  }, [movieId]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        url && (
          <Button color="inherit" size="large" startIcon={<PlayArrowIcon />} onClick={handleClickOpen}>
            Play {videoType}
          </Button>
        )
      )}
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
        <DialogTitle fontWeight={"bold"} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Play {videoType}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
    </React.Fragment>
  );
};

export default PreviewDialog;
