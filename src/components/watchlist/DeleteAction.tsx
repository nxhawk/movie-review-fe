import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import watchlistApi from "../../api/base/watchlist.api";
import toast from "react-hot-toast";
import path from "../../routes/path";

const DeleteAction = ({ watchListId }: { watchListId: string }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const deleteWatchListMutation = useMutation({
    mutationFn: () => watchlistApi.deleteWatchlist(watchListId),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Watch list deleted successfully");
      navigate(path.WATCHLIST);
    },
  });

  const handleDelete = () => {
    setOpen(false);
    deleteWatchListMutation.mutate();
  };

  return (
    <div>
      <div className="text-gray-400 font-bold cursor-pointer" onClick={() => setOpen(true)}>
        Delete
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span className="line-clamp-1">Bạn chắc chắn?</span>
        </DialogTitle>
        <DialogContent className="border-y p-2">
          <DialogContentText id="delete-dialog-description">
            <div className="mt-4">By clicking yes, this list will be permanently deleted.</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex gap-2 mx-3">
          <Button variant="contained" fullWidth color="primary" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="contained" fullWidth color="error" onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAction;
