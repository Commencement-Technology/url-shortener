import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          {user && (
            <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
              <strong>{user.username}</strong>'s Dashboard
            </Typography>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            URL Shortener
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            (location.pathname === "/home" || location.pathname === "/") && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
