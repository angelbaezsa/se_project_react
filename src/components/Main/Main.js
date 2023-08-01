import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";
import { timeFormatter } from "../../utils/Constants";

function Main({ temperature, onClickedCard, isDay, clothingItems }) {
  const typeOfWeather = useMemo(() => {
    if (temperature >= 72) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 71) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  }, [temperature]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase() === typeOfWeather;
  });
  return (
    <section className="Main">
      {isDay ? (
        <WeatherCard day={true} type={"cloudy"} temperature={temperature} />
      ) : (
        <WeatherCard day={false} type={"cloud"} temperature={temperature} />
      )}
      Today is {temperature} F / You may want to wear:
      <section className="card_section">
        {filteredCards.map((item) => {
          return <ItemCard item={item} onclickedCard={onClickedCard} />;
        })}
      </section>
    </section>
  );
}

export default Main;
