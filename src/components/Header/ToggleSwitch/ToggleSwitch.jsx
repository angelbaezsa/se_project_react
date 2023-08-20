import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [switchStatus, setSwitchStatus] = useState("f");

  const handleChange = (event) => {
    switchStatus === "c" ? setSwitchStatus("f") : setSwitchStatus("c");
    console.log(event.target, `Status ${switchStatus}`);
  };
  return (
    <>
      <label className="switch">
        <input
          className="switch__box"
          type="checkbox"
          onChange={handleChange}
        />
        <span
          className={
            switchStatus === "f"
              ? "switch__slider switch__slider-f"
              : "switch__slider switch__slider-c"
          }
        ></span>
        <p
          className={`switch__option-f ${
            switchStatus === "f" && "switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`switch__option-c ${
            switchStatus === "c" && "switch__active"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
};

export default ToggleSwitch;
