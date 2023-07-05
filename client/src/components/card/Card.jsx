import "./card.css";
import Heart from "../../images/heart.svg";
import HeartFilled from "../../images/heartFilled.svg";
import Comment from "../../images/comment.svg";
import Share from "../../images/share.svg";
import Info from "../../images/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === "like" && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleComment = () => {
    socket.emit("sendComment", {
      senderName: user,
      receiverName: post.username,
      text: "Hello! how are you?",
    } )
  }

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification("like")}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => {handleNotification("comment"); handleComment();}}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification("share")}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
