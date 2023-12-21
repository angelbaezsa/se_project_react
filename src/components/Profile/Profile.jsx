import React, { useContext, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import ItemCard from "../ItemCard/ItemCard";
import ClothesSection from "../ClothesSection/CothesSection";
import "./Profile.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Profile = ({
  // onClickedCard,
  ...props
  // onCreateModal,
  // clothingItems,
  // onEditProfile,
  // setUser,
  // onSignOut,
  // aaa,
}) => {
  const {
    onClickedCard,
    onItemLike,
    onCreateModal,
    defaultClothingItems,
    setUser,
    openEditProfile,
    signOut,
  } = props;
  console.log(props);
  const history = useHistory;
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      history.push("/");
    }
  }, [history]);

  // console.log(2);
  // console.log(onEditProfile, aaa);

  return (
    <div className="profile__main">
      <SideBar onSignOut={signOut} openEditProfile={openEditProfile} />
      <div className="card_section-wrapper">
        <div className="title-wrapper">
          <h4 className="main__title">Your items:</h4>
          <button onClick={onCreateModal} className="main__button">
            + Add new
          </button>
        </div>
        <ClothesSection
          clothingItems={defaultClothingItems}
          onClickedCard={onClickedCard}
        />
      </div>
    </div>
  );
};
export default Profile;
