import React, { useContext } from "react";
import "./SideBar.css";
import avatar from "../../images/Avatar img.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ openEditProfile, onSignOut }) => {
  const user = useContext(CurrentUserContext);
  // console.log(props);

  console.log(3);
  console.log(openEditProfile);

  return (
    <>
      <div className="sidebar profile__sidebar">
        <div className="sidebar__avatar-wrapper">
          <img className="sidebar__avatar" src={user.avatar} alt="Avatar"></img>
          <h3 className="sidebar__title">{user.name}</h3>
        </div>
        <div className="sidebar__button-wrapper">
          <button onClick={openEditProfile} className="sidebar__button">
            Update Profile
          </button>
          <button onClick={onSignOut} className="sidebar__button">
            sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
