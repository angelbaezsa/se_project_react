//From now on you need to pack the whole markup of each modal in it's own file
//(you shouldn't have only inputs in AddItemModal.js). Everything should be in AddItemModal.js
//including handleSubmit and so on.
import react from "react-dom";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
