import React from "react";
import ItemCard from "../ItemCard/ItemCard";
const ClothesSection = ({ clothingItems, onClickedCard }) => {
  return (
    <div className="card_section profile__card_section">
      {clothingItems?.map((item) => {
        return (
          <ItemCard item={item} key={item._id} onClickedCard={onClickedCard} />
        );
      })}
    </div>
  );
};
export default ClothesSection;
