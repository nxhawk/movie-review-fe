import { Box, Divider, Slider, Typography } from "@mui/material";
import { getRatingTextColor } from "../../../utils/helper";

type Props = {
  point: number;
  title: string;
  rating: number;
  // eslint-disable-next-line no-unused-vars
  handleChange: (_event: Event, newValue: number | number[]) => void;
};

const SliderRating = ({ point, title, rating, handleChange }: Props) => {
  const marks = [...Array.from({ length: 11 }, (_, i) => ({ value: i * 10, label: `${i * 10}` }))];

  return (
    <div className="space-y-4">
      <Typography variant="h4" color="primary" fontWeight="bold">
        Rating
      </Typography>
      <div className="flex items-center justify-between gap-2">
        <Typography variant="body1" fontWeight={"600"} color="primary" className="italic">
          What did you think of {title}?
        </Typography>
        <div className="text-nowrap">
          <b>{point}%</b> user score
        </div>
      </div>
      {/* ruler */}
      <Box>
        <Slider
          aria-label="Rating"
          defaultValue={30}
          shiftStep={30}
          step={10}
          marks={marks}
          min={0}
          max={100}
          value={rating}
          sx={{
            color: getRatingTextColor(rating),
            height: 10,
          }}
          onChange={handleChange}
        />
      </Box>
      <Divider />
    </div>
  );
};

export default SliderRating;
