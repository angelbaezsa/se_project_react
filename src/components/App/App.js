import { useCallback, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ModalWithItem from "../ModalWithItem/ModalWithItem";
import getWeather from "../../utils/weatherAPI";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  //this state handles the add item modal
  const [activeModal, setActiveModal] = useState("");
  //this state handles the selected cards
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [defaultClothes, setDefaultClothes] = useState([
    ...defaultClothingItems,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGarment = {
      name: itemName,
      link: itemUrl,
      weather: weatherType,
    };
    console.log(itemName, itemUrl, weatherType);
    setDefaultClothes((previeusDefaultClothes) => [
      ...previeusDefaultClothes,
      newGarment,
    ]);
  };

  useEffect(() => {
    getWeather()
      .then((res) => {
        setCurrentTemperature(res.main.temp);
        setCurrentCity(res.name);
        console.log(res.weather[0].main);
      })
      .catch((error) => console.error(`Error${error}`));
  }, []);

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  //this state handles the preview item modal
  const handleOpenPreviewModal = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  return (
    <div className="page">
      <section className="Header">
        <Header onCreateModal={handleCreateModal} city={currentCity} />
      </section>
      <section>
        <Main
          temperature={currentTemperature}
          onClickedCard={handleOpenPreviewModal}
          clothingItems={defaultClothes}
        />
      </section>
      <section className="page__footer">
        <Footer />
      </section>
      {activeModal === "create" && (
        <ModalWithForm
          submitEvent={handleSubmit}
          name="Add-Clothes"
          onCloseModal={handleCloseModal}
        >
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
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ModalWithItem
          name={"preview"}
          item={selectedCard}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
