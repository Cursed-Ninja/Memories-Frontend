import { Container, ThemeProvider, createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postdetails/PostDetails";

const App = () => {
  const theme = createTheme({
    status: {},
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Navigate to="/posts" />} />
              <Route path="/posts" exact element={<Home />} />
              <Route path="/posts/search" exact element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route
                path="/auth"
                exact
                element={!user ? <Auth /> : <Navigate to="/posts" />}
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
