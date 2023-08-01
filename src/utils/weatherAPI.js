const apiKey = `e1e0e54354cd562d3677c265acd0130b`;
const longitude = -75.259072;
const latitude = 39.918446;

const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((response) => {
    if (response.ok) {
      //   console.log(response);
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  });
};

const formatWeather = (data) => {};

export default getWeather;
