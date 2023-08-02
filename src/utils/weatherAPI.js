import { apiKey } from "./constants";
import { latitude } from "./constants";
import { longitude } from "./constants";

const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((response) => checkResponse(response));
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
};

export default getWeather;
