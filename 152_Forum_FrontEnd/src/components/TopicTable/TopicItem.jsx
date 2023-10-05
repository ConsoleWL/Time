import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import React from "react";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";

const TopicItem = ({ topic, userObj }) => {
  const [user, token] = useAuth();
  const handleActive = () => {}; // what is that stuff?

  var checkProdileIsAuthorizedUser = false;
  if (userObj != null) {
    checkProdileIsAuthorizedUser = user.id === userObj.id;
  }

  // it work but does not re-renders automatically, You need to refresh the page
  const handleTopicLikes = async (e) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/topic/like/${topic.topicId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.warn("Error in Home Page , Topic Item, Like Button", error);
    }
  };

  const handleDeleteTopic = async (e) => {
    try {
      const response = await axios.delete(
        `https://localhost:5001/api/topic/${topic.topicId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.warn("Error in Home Page , Topic Item, Delete Button", error);
    }
  };

  const shortDateFormat = dayjs(topic.timePosted).format("MM/DD/YYYY");

  return (
    <tr onClick={handleActive}>
      <td>{topic.topicId}</td>
      <td>
        <Link to={`/topic/${topic.topicId}`}>{topic.title}</Link>
      </td>
      <td>
        <Link to={`/profile/${topic.user.userName}`}>
          {topic.user.userName}
        </Link>
      </td>
      <td> {shortDateFormat}</td>
      <td>
        <button onClick={handleTopicLikes}>{topic.likes}</button>
      </td>

      {checkProdileIsAuthorizedUser ? (
        <td>
          <button onClick={handleDeleteTopic}>Delete</button>
        </td>
      ) : null}
    </tr>
  );
};

export default TopicItem;
