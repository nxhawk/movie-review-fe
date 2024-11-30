import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from "../api/apiUser";
import { toast } from "react-toastify";

const PrimaryAppBar = () => {
  const navigate = useNavigate();
  const { auth, removeAuth } = React.useContext(AuthContext)!;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successfully");
    navigate("/login");
    setAnchorEl(null);
    removeAuth();
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
            navigate("/profile");
          }}
        >
          {auth?.email}
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            APP
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
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
                  //src={user?.avatar}
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
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  LOGIN
                </Link>
                <Link
                  to={"/register"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  REGISTER
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default PrimaryAppBar;
