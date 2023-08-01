import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar img.svg";
import "../Header/Header.css";
import { dateFormatter } from "../Utils/Constants";

function Header({ onCreateModal, city }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo}></img>
        <p>{`${dateFormatter()}, ${city}`}</p>
      </div>
      <div className="avatar">
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add Clothes
        </button>
        <p>Terrence Tegegne</p>
        <img src={avatar}></img>
      </div>
    </header>
  );
}

export default Header;
