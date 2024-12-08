import { Stack, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React from "react";
import { styled } from "@mui/material/styles";

type ButtonActionProps = {
  children: React.ReactNode;
  title: string;
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
  },
}));

const ButtonAction = ({ children, title }: ButtonActionProps) => {
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
      >
        {children}
      </IconButton>
    </BootstrapTooltip>
  );
};

const UserAction = () => {
  return (
    <Stack marginBottom={3} direction="row" spacing={3} sx={{ alignItems: "center" }}>
      <ButtonAction title="Add to list">
        <ListIcon />
      </ButtonAction>
      <ButtonAction title="Mark as favorite">
        <FavoriteIcon />
      </ButtonAction>
      <ButtonAction title="Add to your watchlist">
        <BookmarkIcon />
      </ButtonAction>
    </Stack>
  );
};

export default UserAction;
