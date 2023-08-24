import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar img.svg";
import "../Header/Header.css";
import { formatDate } from "../../utils/utils";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Header({ onCreateModal, city }) {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <Link to="/">
          <img className="logo" src={logo} alt="logo"></img>
        </Link>
        <p className="header__date">{`${formatDate()}, ${city}`}</p>
      </div>
      <div className="avatar-wrapper">
        <ToggleSwitch />
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add Clothes
        </button>
        <div>
          <NavLink to="/profile">
            <p className="header__user-title user-title">Terrence Tegegne</p>
          </NavLink>
        </div>
        <div>
          <Link to="/profile">
            <img className="profile__avatar" src={avatar} alt="Avatar"></img>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
