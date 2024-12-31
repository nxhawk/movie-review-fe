import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { MovieReview } from "../../types/movie.type";
import { Avatar, Box, Card, CardHeader, Chip, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { stringAvatar } from "../../utils/avatarConvert";
import { format } from "date-fns";

type Props = {
  review: MovieReview;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewDialog = ({ review }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Read full the test
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xl"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Card variant="outlined">
            <CardHeader
              avatar={
                review.author_details.avatar_path ? (
                  <Avatar alt={review.author} src={tmdbConfig.imageW200URL + review.author_details.avatar_path} />
                ) : (
                  <Avatar {...stringAvatar(review.author)} />
                )
              }
              title={
                <Typography variant="h6" fontWeight={"bold"}>
                  A review by {review.author}
                </Typography>
              }
              subheader={
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap-reverse" }}>
                  <Chip
                    label={Math.round(review.author_details.rating * 10) + "%"}
                    icon={<StarIcon />}
                    color="primary"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Written by <b>{review.author}</b> on {format(review.created_at, "MMMM dd, yyyy")}
                  </Typography>
                </Box>
              }
            />
          </Card>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 20,
            top: 20,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="custom-scrollbar-w">
          <div
            dangerouslySetInnerHTML={{ __html: review.content.replace(/\n/g, "<br />") }}
            className="font-sans overflow-y-auto"
          ></div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ReviewDialog;
