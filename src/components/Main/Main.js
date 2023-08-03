import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { checkIsDay } from "../../utils/utils";
import "./Main.css";

function Main({ temperature, onClickedCard, clothingItems }) {
  const isDay = checkIsDay();

  const typeOfWeather = () => {
    if (temperature >= 72) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 71) {
      return "warm";
    } else if (temperature <= 65) {
      return "cold";
    }
  };
  const TypeOfWeather = typeOfWeather();

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase() === TypeOfWeather;
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
          return (
            <ItemCard
              item={item}
              key={item._id}
              onClickedCard={onClickedCard}
            />
          );
        })}
      </section>
    </section>
  );
}

export default Main;
