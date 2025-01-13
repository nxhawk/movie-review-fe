import React from "react";
import chatBoxImage from "../../assets/images/chatbot.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tab, Tabs, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@tanstack/react-query";
import llmApi from "../../api/base/llm.api";
import { AxiosError } from "axios";
import { ETabToggle, ILlmSearch, IRouteNavigation } from "../../types/llm.type";
import { MovieDetail } from "../../types/movie.type";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LoadingButton from "@mui/lab/LoadingButton";
import RouteCardResult from "./RouteCardResult";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import MovieSearchResult from "./MovieSearchResult";
import ButtonRecord from "./ButtonRecord";

const Chatbox = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<ETabToggle>(ETabToggle.AI_NAVIGATION);
  const [query, setQuery] = React.useState("");
  const [route, setRoute] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [movies, setMovies] = React.useState<MovieDetail[] | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue == 0 ? ETabToggle.AI_NAVIGATION : ETabToggle.LLM_SEARCH);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };
  const closeResult = () => setShowResult(false);

  const aiNavigationMutation = useMutation({
    mutationFn: () => llmApi.getRouteNavigate(query),
    onError: (error: AxiosError) => {
      setError(error?.message || "Something went wrong");
    },
    onSuccess: (response: IRouteNavigation) => {
      setRoute(response.route);
      setShowResult(true);
      setError("");
    },
  });

  const llmSearchMutation = useMutation({
    mutationFn: () => llmApi.searchMovie(query),
    onError: (error: AxiosError) => {
      setError(error?.message || "Something went wrong");
    },
    onSuccess: (response: ILlmSearch) => {
      setMovies(response.data);
      setShowResult(true);
      setError("");
    },
  });

  const handleSubmit = async () => {
    setError("");
    if (value === ETabToggle.AI_NAVIGATION) {
      aiNavigationMutation.mutate();
    } else {
      llmSearchMutation.mutate();
    }
  };

  const isLoading = aiNavigationMutation.isPending || llmSearchMutation.isPending || isRecording;

  return (
    <>
      <button
        className="fixed z-[100] bottom-4 right-5 bg-slate-300/30 hover:bg-slate-300/40 p-2 rounded-full"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "block" }}
      >
        <img src={chatBoxImage} width={38} height={38} />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        fullWidth
        maxWidth={"lg"}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="flex items-center justify-between gap-8">
            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
              <Tab disabled={showResult || isLoading} label={<div className="text-lg">AI navigation</div>} />
              <Tab disabled={showResult || isLoading} label={<div className="text-lg">LLM search</div>} />
            </Tabs>
            <div className="flex items-center gap-0.5">
              <img src={chatBoxImage} width={38} height={38} className="max-sm:hidden" />
              <IconButton aria-label="open" size="large" onClick={() => setFullScreen(!fullScreen)}>
                {fullScreen ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        {!showResult ? (
          <DialogContent dividers>
            {error && (
              <div className="text-red-500 flex items-center gap-1">
                <WarningAmberIcon color="error" />
                {error}
              </div>
            )}
            <div className="relative">
              <TextField
                fullWidth
                placeholder="Type your query here"
                multiline
                rows={6}
                variant="filled"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                disabled={isLoading}
              />
              <div className="absolute top-1 right-1" style={{ display: query ? "block" : "none" }}>
                <IconButton aria-label="clear" size="small" onClick={() => setQuery("")} disabled={isLoading}>
                  <ClearIcon color="error" />
                </IconButton>
              </div>
              <div className="absolute bottom-3 right-3" style={{ display: query ? "none" : "block" }}>
                <ButtonRecord setQuery={setQuery} open={open} setIsRecording={setIsRecording} />
              </div>
            </div>
            <div className="my-3">
              <LoadingButton
                onClick={handleSubmit}
                fullWidth
                endIcon={<SendIcon />}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
              >
                Send
              </LoadingButton>
            </div>
          </DialogContent>
        ) : (
          <DialogContent dividers className="custom-scrollbar-w">
            {value === ETabToggle.AI_NAVIGATION ? (
              <RouteCardResult handleClose={handleClose} query={query} route={route} closeResult={closeResult} />
            ) : (
              <MovieSearchResult handleClose={handleClose} query={query} movies={movies} closeResult={closeResult} />
            )}
          </DialogContent>
        )}
        <DialogActions sx={{ display: showResult ? "none" : "flex" }}>
          <div className="p-1">
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Chatbox;
