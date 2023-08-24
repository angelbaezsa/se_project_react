import React from "react";
import "./SideBar.css";
import avatar from "../../images/Avatar img.svg";

const SideBar = () => {
  return (
    <div className="sidebar profile__sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar"></img>
      <h3 className="sidebar__title">Terrence Tegegne</h3>
    </div>
  );
};

export default SideBar;
