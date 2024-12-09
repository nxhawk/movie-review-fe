import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getColorByPoint } from "../../utils/helper";

type Props = {
  point: number;
  showText?: boolean;
};

const UserScore = ({ point, showText = false }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hover:scale-110 cursor-pointer transition-all ease-linear w-[68px] h-[68px] bg-[#081c22] rounded-full flex items-center justify-center">
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            className="absolute top-0 left-0"
            variant="determinate"
            size={60}
            value={100}
            sx={{
              color: getColorByPoint(point).track,
            }}
          />
          <CircularProgress
            variant="determinate"
            size={60}
            value={point}
            sx={{
              color: getColorByPoint(point).bar,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", fontWeight: "bold" }}
              className="font-mono"
            >{`${point}%`}</Typography>
          </Box>
        </Box>
      </div>
      {/* Text user score */}
      {showText && (
        <div className="font-bold">
          <p>User</p>
          <p>Score</p>
        </div>
      )}
    </div>
  );
};

export default UserScore;
