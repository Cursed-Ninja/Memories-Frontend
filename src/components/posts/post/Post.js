import { useState } from "react";
// import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  CircularProgress,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

import "./styles.css";

const Post = ({ post, setCurrentId }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { isLikesLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes || []);
  const userID = user?.result?.sub || user?.result?._id;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID) !== undefined ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp;{likes.length}{" "}
          {likes.length > 1 ? "likes" : "like"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLike = async () => {
    setLikes(await dispatch(likePost(post._id)));
  };

  return (
    <Card className="card" raised elevation={6}>
      <ButtonBase className="cardAction" onClick={openPost}>
        <CardMedia
          className="media"
          image={post.selectedFile}
          title={post.title}
        />
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="overlay2" name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className="title" variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.length > 100
              ? post.message.substring(0, 100) + "..."
              : post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        {isLikesLoading ? (
          <CircularProgress size="1rem" />
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={handleLike}
            disabled={!user?.result}
          >
            <Likes />
          </Button>
        )}
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
