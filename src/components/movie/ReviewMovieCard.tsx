import { MovieReview } from "../../types/movie.type";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Chip } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import StarIcon from "@mui/icons-material/Star";
import { format } from "date-fns";
import { stringAvatar } from "../../utils/avatarConvert";
import ReviewDialog from "../dialog/ReviewDialog";

type Props = {
  review: MovieReview;
};

const ReviewMovieCard = ({ review }: Props) => {
  return (
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
      <CardContent>
        <div
          dangerouslySetInnerHTML={{ __html: review.content.replace(/\n/g, "<br />") }}
          className="font-sans line-clamp-[8] overflow-hidden"
        ></div>
        <div className="flex justify-end mt-3 mr-3">
          <ReviewDialog review={review} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewMovieCard;
