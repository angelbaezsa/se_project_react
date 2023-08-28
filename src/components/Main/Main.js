import WeatherCard from "../WeatherCard/WeatherCard";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import { checkIsDay } from "../../utils/utils";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import { useContext } from "react";
// import React from "react";

function Main({ temperature, onClickedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { defaultClothes } = useContext(ClothingItemsContext);
  // console.log(currentTemperatureUnit);
  const temp = Math.ceil(temperature?.temperature?.[currentTemperatureUnit]);
  console.log(temp);
  const isDay = checkIsDay();

  const getWeatherType = () => {
    if (temperature?.temperature?.f >= 72) {
      return "hot";
    } else if (
      temperature?.temperature?.f >= 66 &&
      temperature?.temperature?.f < 72
    ) {
      return "warm";
    } else if (temperature?.temperature?.f < 66) {
      return "cold";
    }
  };

  const kindOfWeather = getWeatherType();
  console.log(kindOfWeather);

  const filteredCards = defaultClothes.filter((item) => {
    return item.weather.toLocaleLowerCase() === kindOfWeather;
  });
  // console.log(temperature?.temperature?.f);
  // console.log(kindOfWeather, filteredCards);

  return (
    <main className="main">
      {isDay ? (
        <WeatherCard day={true} type={"cloudy"} temperature={temp} />
      ) : (
        <WeatherCard day={false} type={"cloud"} temperature={temp} />
      )}
      Today is {`${temp} ${currentTemperatureUnit.toUpperCase()}`} / You may
      want to wear:
      <section className="card_section">
        {filteredCards.map((item) => {
          return (
            <ItemCard
              item={item}
              key={item._id}
              onClickedCard={onClickedCard}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
