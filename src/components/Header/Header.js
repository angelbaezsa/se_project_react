import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar img.svg";
import "../Header/Header.css";
import { formatDate } from "../../utils/utils";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import {
  Link,
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onCreateModal, city, onSignOut, onLogin, onRegister }) {
  const location = useLocation;
  const user = useContext(CurrentUserContext);
  const history = useHistory();
  const isProfileLocation = location.pathname === "/profile";
  const isMainLocation = location.pathname === "/";
  // console.log(user);

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
        {user ? (
          <>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <div>
              <NavLink to="/profile">
                <p className="header__user-title user-title">{user.name}</p>
              </NavLink>
            </div>
            <div>
              <Link to="/profile">
                <img
                  className="profile__avatar"
                  src={user.avatar}
                  alt="Avatar"
                ></img>
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="header__nav" onClick={onLogin}>
              Log in
            </span>
            <span className="header__nav" onClick={onRegister}>
              Sign up
            </span>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
