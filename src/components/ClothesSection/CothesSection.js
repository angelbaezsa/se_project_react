import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const ClothesSection = ({ clothingItems, onClickedCard, ...rest }) => {
  const { onLikeItem } = rest;

  const user = useContext(CurrentUserContext);
  const userClothingItems = clothingItems
    ?.filter((item) => item.owner === user._id)
    .toReversed();

  return (
    <div className="card_section profile__card_section">
      {userClothingItems.map((item) => {
        // []
        // console.log(item);
        return (
          <ItemCard
            item={item}
            key={item._id}
            onClickedCard={onClickedCard}
            onLikeItem={onLikeItem}
          />
        );
      })}
    </div>
  );
};
export default ClothesSection;
