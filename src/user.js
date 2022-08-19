import React from "react";
import { MdLocationPin } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";

const User = ({ user }) => {
  var url = user.avatar_url;

  return (
    <div className="user">
      <div className="img-git">
        <img src={url} alt={user.name} className="person-img"></img>
        <div>
          {user?.location && <DiGithubBadge />}
          {user.html_url}
        </div>
      </div>
      <div className="bio-location-twitter">
        <h1 className="username">{user.name}</h1>
        <p>{user.bio}</p>
        {user.location && <MdLocationPin />}
        {user.location}{" "}
        <p>
          {user.twitter_username && "Twitter:https/twitter.com/"}
          {user.twitter_username}
        </p>
      </div>
    </div>
  );
};

export default User;
