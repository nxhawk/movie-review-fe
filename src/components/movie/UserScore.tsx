import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getColorByPoint } from "../../utils/helper";
import { cn } from "../../utils/cn";

type Props = {
  point: number;
  showText?: boolean;
  size?: "small" | "large";
};

const UserScore = ({ point, showText = false, size = "small" }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "cursor-pointer w-[58px] h-[58px] bg-[#081c22] rounded-full flex items-center justify-center",
          size === "large" && "h-[68px] w-[68px] hover:scale-110 transition-all ease-linear",
        )}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            className="absolute top-0 left-0"
            variant="determinate"
            size={size === "small" ? 50 : 60}
            value={100}
            sx={{
              color: getColorByPoint(point).track,
            }}
          />
          <CircularProgress
            variant="determinate"
            size={size === "small" ? 50 : 60}
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
              component="div"
              fontSize={size === "small" ? "18px" : "20px"}
              sx={{ color: "white", fontWeight: "bold" }}
              className="font-mono"
            >
              {point == 0 ? "NR" : `${point}%`}
            </Typography>
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
