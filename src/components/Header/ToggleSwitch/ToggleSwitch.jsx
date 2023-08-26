import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../../context/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitch } = useContext(
    CurrentTemperatureUnitContext
  );

  console.log(`Status ${currentTemperatureUnit}`);

  return (
    <>
      <label className="switch">
        <input
          className="switch__box"
          type="checkbox"
          onChange={handleToggleSwitch}
        />
        <span
          className={
            currentTemperatureUnit === "f"
              ? "switch__slider switch__slider-f"
              : "switch__slider switch__slider-c"
          }
        ></span>
        <p
          className={`switch__option-f ${
            currentTemperatureUnit === "f" && "switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`switch__option-c ${
            currentTemperatureUnit === "c" && "switch__active"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
};

export default ToggleSwitch;
