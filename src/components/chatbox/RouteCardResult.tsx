import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";

type Props = {
  route: string;
  query: string;
  handleClose: () => void;
  closeResult: () => void;
};

const RouteCardResult = ({ query, route, handleClose, closeResult }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Result query: `<i>{query}</i>`
        </Typography>
        <div className="flex items-center gap-2 my-2">
          <Typography sx={{ fontSize: 20 }}>You will be redirected to the link:</Typography>
          <div className="px-5 border rounded-lg flex items-center justify-center">{route}</div>
        </div>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Click <span className="text-cyan-600 font-semibold">redirect</span> to go to the above link, click{" "}
          <span className="text-red-600 font-semibold">close</span> to return
        </Typography>
      </CardContent>
      <CardActions>
        <div className="flex justify-end gap-4 w-full">
          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            onClick={() => {
              handleClose();
              navigate(route);
            }}
          >
            Redirect
          </Button>
          <Button variant="contained" color="error" onClick={closeResult}>
            Close
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default RouteCardResult;
