import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, parseWeatherForecast } from "../../utils/weatherAPI";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getClothes } from "../../utils/ClothesApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addNewClothes } from "../../utils/ClothesApi";
import { deleteClothing } from "../../utils/ClothesApi";

function App() {
  //this state handles the add item modal
  const [activeModal, setActiveModal] = useState("");
  //this state handles the selected cards
  const [selectedCard, setSelectedCard] = useState({}); // selects a card item to display in modal
  const [currentTemperature, setCurrentTemperature] = useState(); //holds temperature from API res
  const [currentCity, setCurrentCity] = useState(""); //holds city from API res
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("f"); //Farenheit || Celsius
  const [defaultClothes, setDefaultClothes] = useState([]); //clothes from Array given in sprint 9
  // import  from "../context/CurrentTemperatureUnitContext";

  //this use effect charges the weather api
  useEffect(() => {
    getWeather()
      .then((res) => {
        const forecast = parseWeatherForecast(res); //returns an object of type forecast
        setCurrentTemperature(forecast);
        setCurrentCity(res.name);
        console.log(res.weather[0].main);
      })
      .catch((error) => console.error(`Error${error}`));
    getClothes()
      .then((response) => {
        setDefaultClothes(response);
      })
      .catch((error) => console.error(`Error${error}`));
  }, []);

  const handleAddNewClothes = ({ newGarment, setItemName, setItemUrl }) => {
    addNewClothes(newGarment)
      .then((response) => {
        console.log(response);
        setDefaultClothes((previeusDefaultClothes) => [
          newGarment,
          ...previeusDefaultClothes,
        ]);
        handleCloseModal();
        setItemName("");
        setItemUrl("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (card) => {
    deleteClothing(card._id)
      .then((res) => {
        const updatedClothes = defaultClothes.filter((item) => {
          return item._id !== card._id;
        });
        setDefaultClothes(updatedClothes);
        handleCloseModal();
      })
      .catch((error) => console.error(error));
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
    // setItemName("");
    // setItemUrl("");
  };
  //this state handles the preview item modal
  const handleOpenPreviewModal = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "c") {
      setcurrentTemperatureUnit("f");
    } else if (currentTemperatureUnit === "f") {
      setcurrentTemperatureUnit("c");
    }
  };

  return (
    <div className="page">
      <ClothingItemsContext.Provider value={{ defaultClothes }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <section className="Header">
            <Header onCreateModal={handleCreateModal} city={currentCity} />
          </section>
          <Switch>
            <Route exact path="/">
              <Main
                temperature={currentTemperature}
                onClickedCard={handleOpenPreviewModal}
                clothingItems={defaultClothes}
              />
            </Route>
            <Route path="/profile">
              <Profile
                clothingItems={defaultClothes}
                onClickedCard={handleOpenPreviewModal}
                onCreateModal={handleCreateModal}
              />
            </Route>
          </Switch>
          <section></section>
          <section className="page__footer">
            <Footer />
          </section>
          {activeModal === "create" && (
            <AddItemModal
              defaultClothes={defaultClothes}
              onCloseModal={handleCloseModal}
              handleAddNewClothes={handleAddNewClothes}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              name={"preview"}
              item={selectedCard}
              onCloseModal={handleCloseModal}
              onDelete={handleDelete}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemsContext.Provider>
    </div>
  );
}

export default App;
