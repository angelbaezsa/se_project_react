import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChangeChange: () => {},
});

export default CurrentTemperatureUnitContext;
