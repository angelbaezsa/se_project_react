import "./ModalWithItem.css";
const ModalWithItem = ({ name, onCloseModal, item }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal_content modal__card">
        <div className="card-ilustration">
          <button
            className="modal_close-button"
            onClick={onCloseModal}
          ></button>
          <img className="modal__preview-image" src={item.link} alt="" />
        </div>

        <div className="card_content">
          <p>{item.name}</p>
          <p>Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
};
export default ModalWithItem;
