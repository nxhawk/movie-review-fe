import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ButtonAction } from "../movie/UserAction";
import ListIcon from "@mui/icons-material/List";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import path from "../../routes/path";
import { IWatchList } from "../../types/watchlist.type";
import watchlistApi from "../../api/base/watchlist.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type Props = {
  movieId: string | number;
};

const AddMovieToWatchListDialog = ({ movieId }: Props) => {
  const { auth } = React.useContext(AuthContext)!;
  const [open, setOpen] = React.useState(false);
  const [selectedWatchList, setSelectedWatchList] = React.useState<string>("");
  const [watchLists, setWatchLists] = React.useState<IWatchList[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const getAllWatchListQuery = useQuery({
    queryKey: ["all-watch-list"],
    queryFn: async () => {
      const response: IWatchList[] = await watchlistApi.getAllWatchlist();
      setWatchLists(response);
      return response;
    },
    gcTime: 0,
  });

  const addMovieToWatchlistMutation = useMutation({
    mutationFn: () => watchlistApi.addMovieToWatchlist(movieId.toString(), selectedWatchList),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Watch list updated successfully");
      setOpen(false);
    },
  });

  const handleOpenAddToWatchlist = () => {
    if (!auth) return;
    setOpen(true);
  };

  const handleAddToWatchlist = () => {
    if (!auth) return;
    if (selectedWatchList.length <= 0) {
      setErrorMessage("Please select a watchlist");
      return;
    }
    addMovieToWatchlistMutation.mutate();
  };

  return (
    <div>
      {/* hanlde add movie to watchlist */}
      <ButtonAction
        title={auth ? "Add to your watchlist" : "Login to add this movie to your watchlist"}
        onClick={handleOpenAddToWatchlist}
      >
        <ListIcon />
      </ButtonAction>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-dialog-title"
        aria-describedby="add-dialog-description"
      >
        <DialogTitle id="add-dialog-title">
          <span className="line-clamp-1">Add this movie to your watchlist</span>
        </DialogTitle>
        <DialogContent className="border-y p-2">
          <div className="py-2 flex justify-end">
            <Button startIcon={<AddIcon />} className=" flex items-center gap-1">
              <Link to={`${path.WATCHLIST}/${path.NEW}`}>Create New List</Link>
            </Button>
          </div>
          <InputLabel sx={{ marginBottom: "5px" }} id="select-public">
            Watchlist
          </InputLabel>
          <Select
            labelId="select-public"
            style={{ width: "100%" }}
            value={selectedWatchList}
            disabled={getAllWatchListQuery.isLoading || getAllWatchListQuery.isPending}
            onChange={(e) => {
              setSelectedWatchList(e.target.value as string);
              setErrorMessage("");
            }}
            sx={{ background: "#f5f7f8" }}
            error={!!errorMessage}
          >
            <MenuItem value="" disabled>
              <em>Select watchlist</em>
            </MenuItem>
            {watchLists?.map((watchList) => (
              <MenuItem key={watchList.id} value={watchList.id}>
                <div className="line-clamp-1">
                  {watchList.name}
                  &nbsp;
                  <span>
                    ({watchList.movieIDs.length}&nbsp;{watchList.movieIDs.length !== 1 ? "items" : "item"})
                  </span>
                </div>
              </MenuItem>
            ))}
          </Select>
          {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
          <div className="mb-3"></div>
        </DialogContent>
        <DialogActions className="flex gap-2 mx-2">
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleAddToWatchlist}
            disabled={addMovieToWatchlistMutation.isPending}
          >
            Add
          </Button>
          <Button variant="contained" fullWidth color="error" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMovieToWatchListDialog;
