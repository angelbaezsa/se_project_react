import "./ItemModal.css";
import { deleteClothing } from "../../utils/ClothesApi";

const ItemModal = ({
  defaultClothes,
  setDefaultClothes,
  name,
  onCloseModal,
  item,
  onDelete,
}) => {
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
          <button
            onClick={() => {
              onDelete(item);
            }}
            className="add-item-form__delete-button delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
