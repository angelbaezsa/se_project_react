import "./WeatherCard.css";
import image from "../../images/day/cloudy.svg";

const weatherOptions = [
  {
    url: require("../../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/day/rainy.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../../images/day/lighting.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../../images/day/snowing.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/day/fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../../images/night/cloud.svg").default,
    day: false,
    type: "cloud",
  },
  {
    url: require("../../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../../images/night/lighting.svg").default,
    day: false,
    type: "storm",
  },
  {
    url: require("../../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../../images/night/fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../../images/night/snowing.svg").default,
    day: false,
    type: "snowing",
  },
];

const WeatherCard = ({ day = true, type = "cloudy", temperature = "" }) => {
  const weatherOption = weatherOptions.filter((i) => {
    return i.type === type && i.day === day;
  });

  const imageSrc = weatherOption[0].url;
  return (
    <>
      <div className="weatherCard">
        <h3 className="weathercard__info">{temperature} F</h3>
        <img className="weathercard__image" src={imageSrc} alt=""></img>
      </div>
    </>
  );
};
export default WeatherCard;
