import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./post/Post";
// import useStyles from "./styles";

import "./styles.css";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  // const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className="container" container align-items="stretch" spacing="10">
      {posts.map((post) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
