import "./navbar.css";
import Notification from "../../images/notification1.svg";
import Message from "../../images/message.svg";
import Settings from "../../images/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [comments, setComments] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("getComment", (data) => {
      setComments((prev) => [...prev, data]);
    });
  }, [socket]);

  //console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === "like") {
      action = "liked";
    } else if (type === "comment") {
      action = "commented on";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const displayComment = ({ senderName, text }) => {
    return (
      <span className="notification">{`${senderName} commented on your post: "${text}"`}</span>
    );
  };

  const handleRead = (type) => {
    if (type === "notif") {
      setNotifications([]);
      setOpenNotif(false);
    }

    if (type === "msg") {
      setComments([]);
      setOpenMsg(false);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">Notify</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpenNotif(!openNotif)}>
          <img src={Notification} alt="" className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpenMsg(!openMsg)}>
          <img src={Message} alt="" className="iconImg" />
          {comments.length > 0 && (
            <div className="counter">{comments.length}</div>
          )}
        </div>
        <div className="icon">
          <img src={Settings} alt="" className="iconImg" />
        </div>
      </div>
      {openNotif && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={() => handleRead("notif")}>
            Mark as read
          </button>
        </div>
      )}
      {openMsg && (
        <div className="notifications">
          {comments.map((c) => displayComment(c))}
          <button className="nButton" onClick={() => handleRead("msg")}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
