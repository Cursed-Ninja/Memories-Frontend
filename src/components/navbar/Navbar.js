import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import decode from "jwt-decode";

import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
// import useStyles from "./styles";

import "./styles.css";

const Navbar = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    googleLogout();
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className="appBar" position="static" color="inherit">
      <Link to={"/"} className="brandContainer">
        <img src={memoriesText} alt="icon" height="45px" />
        <img className="image" src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="username" variant="h6">
              {user.result.name.split(" ")[0].slice(0, 10)}
            </Typography>
            <Button
              variant="contained"
              className="logout"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/auth")}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
