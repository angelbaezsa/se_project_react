import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar img.svg";
import "../Header/Header.css";
import { formatDate } from "../../utils/utils";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

function Header({ onCreateModal, city }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <p>{`${formatDate()}, ${city}`}</p>
      </div>
      <div className="avatar">
        <ToggleSwitch />
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add Clothes
        </button>
        <p className="header__user-title user-title">Terrence Tegegne</p>
        <img src={avatar} alt="Avatar"></img>
      </div>
    </header>
  );
}

export default Header;
