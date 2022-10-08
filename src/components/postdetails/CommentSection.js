import { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

// import useStyles from "./styles";
import "./styles.css";

import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  // const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    setComment("");
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
  };

  useEffect(() => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  return (
    <div>
      <div className="commentsOuterContainer">
        <div className="commentsInnerContainer">
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.length ? (
            comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))
          ) : (
            <Typography gutterBottom variant="subtitle1">
              No comments
            </Typography>
          )}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
