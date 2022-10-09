import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
// import useStyles from "./styles";

import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  // const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postData.title || !postData.message || !postData.tags) {
      alert("Please fill out all the required fields");
      return;
    }
    if (
      postData.selectedFile &&
      postData.selectedFile.slice(5, 10) !== "image"
    ) {
      alert("Please upload an image");
      return;
    }
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);

    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if (!user?.result?.name) {
    return (
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center" >
          Please sign in to create your memories and like others' memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`root form`}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>
          <Typography variant="caption" style={{ color: "red" }}>
            *required fields
          </Typography>
        </div>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
        <TextField
          name="message"
          variant="outlined"
          multiline
          rows={10}
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          required
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags ? postData.tags.join(",") : ""}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(","),
            })
          }
          required
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        ></FileBase>

        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
