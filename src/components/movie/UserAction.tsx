import { Stack, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { styled } from "@mui/material/styles";
import PreviewDialog from "../dialog/PreviewDialog";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import favoriteApi from "../../api/base/favorite.api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import AddMovieToWatchListDialog from "../dialog/AddMovieToWatchListDialog";

type ButtonActionProps = {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 13,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

export const ButtonAction = ({ children, title, onClick }: ButtonActionProps) => {
  return (
    <BootstrapTooltip title={title}>
      <IconButton
        size="large"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.main,
          },
        }}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </BootstrapTooltip>
  );
};

type Props = {
  movieId: number | string;
};

const UserAction = ({ movieId }: Props) => {
  const { auth } = React.useContext(AuthContext)!;
  const [isFavorite, setIsFavorite] = React.useState(false);

  const checkIsFavoriteQuery = useQuery({
    queryKey: ["favorite", movieId],
    queryFn: async () => {
      const response = await favoriteApi.checkFavorite(movieId!);
      setIsFavorite(response);
      return response;
    },
    enabled: Boolean(movieId) && Boolean(auth?.email),
    gcTime: 0,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.addFavorite(movieId),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Added to favorite list successfully");
      checkIsFavoriteQuery.refetch();
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.removeFavorite(movieId),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Removed from favorite list successfully");
      checkIsFavoriteQuery.refetch();
    },
  });

  const handleUpdateFavorite = () => {
    if (!auth || removeFavoriteMutation.isPending || addFavoriteMutation.isPending || checkIsFavoriteQuery.isLoading)
      return;
    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  return (
    <Stack marginBottom={3} direction="row" spacing={3} sx={{ alignItems: "center" }}>
      {/* hanlde add movie to watchlist */}
      <AddMovieToWatchListDialog movieId={movieId} />
      {/* handle add movie to favorite */}
      <ButtonAction
        title={
          auth
            ? isFavorite
              ? "Remove from your favorite list"
              : "Mark as favorite"
            : "Login to add this movie to your favorite list"
        }
        onClick={handleUpdateFavorite}
      >
        <FavoriteIcon sx={{ color: isFavorite ? "#e91e63" : "white" }} />
      </ButtonAction>
      <PreviewDialog movieId={movieId} />
    </Stack>
  );
};

export default UserAction;
