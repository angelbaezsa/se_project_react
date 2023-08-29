import React from "react";
import "./AddItemModal.css";
import { addNewClothes } from "../../utils/ClothesApi";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({
  defaultClothes,
  onCloseModal,
  handleAddNewClothes,
}) => {
  const [itemName, setItemName] = useState(""); //info for new card item
  const [itemUrl, setItemUrl] = useState(""); //info for new card item
  const [weatherType, setWeatherType] = useState(""); //info for new card item

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGarment = {
      name: itemName,
      imageUrl: itemUrl,
      weather: weatherType,
      _id: defaultClothes.lenght + 1,
    };
    handleAddNewClothes({ newGarment, setItemName, setItemUrl });
  };

  return (
    <ModalWithForm
      onCloseModal={onCloseModal}
      submitEvent={handleSubmit}
      name={"Add Clothes"}
    >
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
        <h4 className="form__label radio-button_title">Select weather type:</h4>
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
    </ModalWithForm>
  );
};

export default AddItemModal;
