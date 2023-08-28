import React from "react";
import "./AddItemModal.css";
import { addNewClothes } from "../../utils/ClothesApi";

const AddItemModal = ({
  itemName,
  setItemName,
  itemUrl,
  setItemUrl,
  weatherType,
  setWeatherType,
  setDefaultClothes,
  onCloseModal,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newGarment = {
      name: itemName,
      imageUrl: itemUrl,
      weather: weatherType,
    };

    addNewClothes(newGarment)
      .then((response) => {
        console.log(response);
        setDefaultClothes((previeusDefaultClothes) => [
          ...previeusDefaultClothes,
          newGarment,
        ]);
        onCloseModal();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={`modal modal_type_add-item`}>
      <div className="modal_content">
        <button
          className="form_close-button close-button"
          onClick={onCloseModal}
        ></button>
        <h3 className="form_title">Add Clothes</h3>
        <form action="submit" onSubmit={handleSubmit}>
          <div>
            <label className="form__input-label">
              Name
              <input
                className="form__input input_type_name"
                type="text"
                placeholder="Name"
                required
                value={itemName} //value of the state variable
                onChange={(event) => {
                  setItemName(event.target.value);
                }}
              />
            </label>
            <label className="form__input-label" type="text">
              Image URL
              <input
                className="form__input input_type_url"
                type="url"
                placeholder="URL"
                required
                value={itemUrl} //value of the state variable
                onChange={(event) => {
                  setItemUrl(event.target.value);
                }}
              />
            </label>
            <h4 className="form__label radio-button_title">
              Select weather type:
            </h4>
            <div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_hot"
                  type="radio"
                  name="weather"
                  id="hot"
                  required
                  value="hot"
                  checked={weatherType === "hot"}
                  onChange={() => setWeatherType("hot")}
                />
                <label className="radio-button_label">Hot</label>
              </div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_warm"
                  type="radio"
                  name="weather"
                  id="warm"
                  value="warm"
                  checked={weatherType === "warm"}
                  onChange={() => setWeatherType("warm")}
                />
                <label className="radio-button_label">Warm</label>
              </div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_cold"
                  type="radio"
                  name="weather"
                  id="cold"
                  value="cold"
                  checked={weatherType === "cold"}
                  onChange={() => setWeatherType("cold")}
                />
                <label className="radio-button_label">Cold</label>
              </div>
            </div>
          </div>
          <button className="form__button-submit" type="submit">
            Add Garment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
