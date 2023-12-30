import "./ItemModal.css";
import { useContext } from "react";
import { deleteClothing } from "../../utils/ClothesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ name, onCloseModal, item, onDelete }) => {
  const user = useContext(CurrentUserContext);
  // console.log("-----------------", item);
  // console.log("=================", user);

  const isCardOwner = () => item.owner === user._id;
  //! pls fix delete button from not owner

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal_preview_content modal__card">
        <div className="card-ilustration">
          <button
            className="modal_close-button"
            onClick={onCloseModal}
          ></button>
          <img
            className="modal__preview-image"
            src={item.imageUrl}
            alt={`ilustration of: ${item.name}`}
          />
        </div>

        <div className="card_content">
          <p className="card__content-subtitle">{item.name}</p>
          <p className="card__content-subtitle">Weather: {item.weather}</p>
          {isCardOwner() ? (
            <button
              onClick={() => {
                onDelete(item);
              }}
              className="add-item-form__delete-button delete-button"
            >
              Delete Item
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
