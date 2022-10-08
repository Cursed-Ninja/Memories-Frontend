//TODO: fix recommended posts

import { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost, getPosts } from "../../actions/posts";

// import useStyles from "./styles";

import "./styles.css";

import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const classes = useStyles();
  const { id } = useParams();
  const [recommendedPosts, setRecommendedPosts] = useState(null);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    dispatch(getPosts());
  }, [post]);

  useEffect(() => {
    if (posts && post) {
      setRecommendedPosts(
        posts.filter(({ _id, tags }) => {
          return (
            post.tags.some((tag) => tags.includes(tag)) && _id !== post._id
          );
        })
      );
    }
  }, [posts]);

  if (!post || isLoading || recommendedPosts == null)
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em" />
      </Paper>
    );

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div>
        <div className="card-details">
          <div className="section">
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          <div className="imageSection">
            <img src={post.selectedFile} alt={post.title} />
          </div>
        </div>
        <Divider style={{ margin: "20px 0" }} />
        <CommentSection post={post} />
        <Divider style={{ margin: "20px 0" }} />
      </div>
      {recommendedPosts.length > 0 ? (
        <div className="section">
          <Typography gutterBottom variant="h5">
            You might also like:{" "}
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" alt="memory" />
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default PostDetails;
