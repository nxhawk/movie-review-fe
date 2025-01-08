import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  rating: number;
  color?: string;
};

const ListStar = ({ rating, color }: Props) => {
  return (
    <Rating
      name="half-rating-read"
      defaultValue={rating}
      precision={0.5}
      readOnly
      emptyIcon={<StarIcon style={{ opacity: 0.3, color }} fontSize="inherit" />}
    />
  );
};

export default ListStar;
