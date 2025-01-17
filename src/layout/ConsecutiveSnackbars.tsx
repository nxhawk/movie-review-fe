import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import healthApi from "../api/base/health.api";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

export default function ConsecutiveSnackbars() {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([
    {
      message:
        "Vui lòng khởi động server trước khi sử dụng trang web, nếu không sẽ phải chờ rất lâu\nNhấn RUN SERVER để khởi động server và chờ một chút",
      key: new Date().getTime(),
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

  const healthCheckMutation = useMutation({
    mutationFn: healthApi.getHealth,
    onError: () => setOpen(true),
    onSuccess: () => setOpen(false),
  });

  React.useEffect(() => {
    // check server is available

    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      healthCheckMutation.mutate();
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackPack, messageInfo, open]);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        sx={{ whiteSpace: "pre-line" }}
        action={
          <React.Fragment>
            <Button
              color="info"
              size="small"
              onClick={() => {
                window.open(import.meta.env.VITE_REACT_APP_SERVER_ROOT + "/docs", "_blank");
              }}
            >
              RUN SERVER
            </Button>
            <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
