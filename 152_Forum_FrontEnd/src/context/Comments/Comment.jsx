import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Comment = ({ commentObj, userObj }) => {
  const { topicId } = useParams();
  const [user, token] = useAuth();

  var checkProdileIsAuthorizedUser = false;
  if (userObj != null) {
    checkProdileIsAuthorizedUser = user.id === userObj.id;
  }

  const handleDeleteComment = async (e) => {
    try {
      const response = await axios.delete(
        `https://localhost:5001/api/comment/${commentObj.commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.warn("Error in Home Page , Comment Item, Delete Button", error);
    }
  };

  const handleCommentLikes = async (e) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/comment/like/${commentObj.commentId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.warn(
        "Error in Topic Page, Comment Component, handleCommentLikes Button",
        error
      );
    }
  };

  return (
    <div>
      <br />
      <div>
        <span>id: {commentObj.commentId} </span>
        <span>
          likes:
          <button onClick={handleCommentLikes}> {commentObj.likes}</button>
        </span>
        <span>
          Author:
          <Link to={`/profile/${commentObj.user.userName}`}>
            {commentObj.user.userName}
          </Link>
        </span>
        <div>
          <span>Text: {commentObj.text}</span>
        </div>
        <div>
          {checkProdileIsAuthorizedUser ? (
            <button onClick={handleDeleteComment}>Delete</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
