import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const ResponsiveAppBar = ({ onVoteNow }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleVoteNow = () => {
    // Add your logic for handling the "Vote Now" action
    onVoteNow && onVoteNow();
    handleCloseNavMenu();
  };

  const pages = ["Home", "Vote Now", "Results"];
  const emojiForHome = "📊"; // Add the emoji here
  const emojiForVoteNow = "🗳️"; // Add the emoji here
  const emojiForResult = "🏆"; // Add the emoji here

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {emojiForHome} POLL
        </Typography>

        <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {page === "Home" ? (
                    <>
                      {emojiForHome} {page}
                    </>
                  ) : page === "Vote Now" ? (
                    <>
                      {emojiForVoteNow} {page}
                    </>
                  ) : page === "Results" ? (
                    <>
                      {emojiForResult} {page}
                    </>
                  ) : (
                    page
                  )}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={page === "Vote Now" ? handleVoteNow : handleCloseNavMenu}
              component={Link}
              to={
                page === "Home"
                  ? "/"
                  : page === "Vote Now"
                  ? "/vote"
                  : page === "Results"
                  ? "/result"
                  : `/${page.toLowerCase()}`
              }
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page === "Home" ? (
                <>
                  {emojiForHome} {page}
                </>
              ) : page === "Vote Now" ? (
                <>
                  {emojiForVoteNow} {page}
                </>
              ) : page === "Results" ? (
                <>
                  {emojiForResult} {page}
                </>
              ) : (
                page
              )}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {["Profile", "Account", "Dashboard", "Logout"].map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
