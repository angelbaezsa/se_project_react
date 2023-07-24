import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar img.svg";
import css from "../Header/Header.css";

const dateFormatter = () => {
  const date = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo}></img>
        <p>{dateFormatter()}</p>
      </div>
      <div className="avatar">
        <button className="header__button" type="text">
          + Add Clothes
        </button>
        <p>Terrence Tegegne</p>
        <img src={avatar}></img>
      </div>
    </header>
  );
}

export default Header;
