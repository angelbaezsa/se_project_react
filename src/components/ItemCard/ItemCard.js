import { useCallback, useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onClickedCard, onLikeItem }) {
  const user = useContext(CurrentUserContext);

  const isLiked = item.likes.some((userId) => {
    if (user !== null) {
      return userId === user._id || user._id === null;
    } else {
      return false;
    }
  });

  // console.log(isLiked);

  const handleLikeItem = (e) => {
    console.log(onLikeItem);
    onLikeItem({ _id: item._id, isLiked });
  };

  return (
    <>
      {user ? (
        <div className="card">
          <div className="card_title-wrapper">
            <p className="card_title">{item.name}</p>
            <div
              className={`card_like-button ${
                isLiked ? "card_like-button-liked" : "card_like-button-default"
              }`}
              onClick={handleLikeItem}
            ></div>
          </div>
          <img
            className="card_image"
            src={item.imageUrl}
            alt={`illustration of ${item.name}`}
            onClick={() => {
              onClickedCard(item);
            }}
          />
        </div>
      ) : (
        <div className="card">
          <div className="card_title-wrapper">
            <p className="card_title">{item.name}</p>
          </div>
          <img
            className="card_image"
            src={item.imageUrl}
            alt={`illustration of ${item.name}`}
            onClick={() => {
              onClickedCard(item);
            }}
          />
        </div>
      )}
    </>
  );
}

export default ItemCard;
