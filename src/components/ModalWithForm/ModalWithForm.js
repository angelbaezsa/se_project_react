//From now on you need to pack the whole markup of each modal in it's own file
//(you shouldn't have only inputs in AddItemModal.js). Everything should be in AddItemModal.js
//including handleSubmit and so on.
import react from "react-dom";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

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
