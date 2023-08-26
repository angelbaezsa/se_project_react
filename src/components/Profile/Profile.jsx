import React from "react";
import SideBar from "../SideBar/SideBar";
import ItemCard from "../ItemCard/ItemCard";
import "./Profile.css";

const Profile = ({ onCreateModal, clothingItems, onClickedCard }) => {
  return (
    <div className="profile__main">
      <SideBar />
      <div className="card_section-wrapper">
        <div className="title-wrapper">
          <h4 className="main__title">Your items:</h4>
          <button onClick={onCreateModal} className="main__button">
            + Add new
          </button>
        </div>
        <div className="card_section profile__card_section">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                onClickedCard={onClickedCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Profile;
