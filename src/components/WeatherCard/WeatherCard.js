import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type = "cloudy", temperature }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find((item) => {
    return item.type === type && item.day === day;
  });

  const imageSrc = weatherOption.url;
  return (
    <div className="weatherCard">
      <h3 className="weathercard__info">{`${temperature} ${currentTemperatureUnit.toUpperCase()}`}</h3>
      <img
        className="weathercard__image"
        src={imageSrc}
        alt={`Ilustration of weather card`}
      ></img>
    </div>
  );
};
export default WeatherCard;
