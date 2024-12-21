import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, IconButton, Menu, MenuItem, Slide, useScrollTrigger } from "@mui/material";
import Logo from "../components/common/Logo";
import path from "../routes/path";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import authApi from "../api/base/auth.api";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { SearchBar } from "./SearchBar";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const PrimaryAppBar = () => {
  const navigate = useNavigate();
  const { auth, removeAuth } = React.useContext(AuthContext)!;
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onError: (error: AxiosError) => {
      toast.error(error?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Logout successfully");
      navigate(path.LOGIN);
      setAnchorEl(null);
      removeAuth();
    },
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: "35px" }}
    >
      {auth != null && (
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate(path.PROFILE);
          }}
        >
          {auth?.email}
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]);

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: {
                  xs: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                },
              }}
            >
              {auth !== null ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={`${auth?.email}`}
                    style={{
                      border: "2px solid white",
                      color: "white",
                      backgroundColor: "#3f51b5",
                    }}
                  >
                    {auth?.email.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              ) : (
                <>
                  <Link
                    to={path.LOGIN}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={path.REGISTER}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
              {location.pathname !== "/search" &&
                (showSearch ? (
                  <IconButton aria-label="close" sx={{ color: "white" }} onClick={() => setShowSearch(false)}>
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="search" color="secondary" onClick={() => setShowSearch(true)}>
                    <SearchIcon />
                  </IconButton>
                ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* Thanh tìm kiếm */}
      <SearchBar showSearch={location.pathname !== "/search" && showSearch} />

      {renderMenu}
    </Box>
  );
};

export default PrimaryAppBar;
