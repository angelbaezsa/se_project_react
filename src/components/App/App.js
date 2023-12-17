import { useEffect, useState } from "react";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, parseWeatherForecast } from "../../utils/weatherAPI";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
// import { getClothes } from "../../utils/ClothesApi";
import { baseUrl } from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import auth, { signIn, signUp, checkToken, signOut } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import { addNewClothes } from "../../utils/ClothesApi";
// import { deleteClothing } from "../../utils/ClothesApi";
import { ClothesApi } from "../../utils/ClothesApi";
import { UsersApi } from "../../utils/UsersApi";
import ClothesSection from "../ClothesSection/CothesSection";
const clothesApi = new ClothesApi({ baseUrl });
const usersApi = new UsersApi({ baseUrl });

function App() {
  //this state handles the add item modal
  const [activeModal, setActiveModal] = useState("");
  //this state handles the selected cards
  const [selectedCard, setSelectedCard] = useState({}); // selects a card item to display in modal
  const [currentTemperature, setCurrentTemperature] = useState(); //holds temperature from API res
  const [currentCity, setCurrentCity] = useState(""); //holds city from API res
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("f"); //Farenheit || Celsius
  const [defaultClothes, setDefaultClothes] = useState([]); //clothes from Array given in sprint 9
  const [user, setUser] = useState(null);
  const [openEditProfileModal, setEditOpenProfileModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [token, setToken] = useState(null);
  // import  from "../context/CurrentTemperatureUnitContext";

  //this effect charges the weather api and clothing items on page load

  useEffect(() => {
    getWeather()
      .then((res) => {
        const forecast = parseWeatherForecast(res); //returns an object of type forecast
        setCurrentTemperature(forecast);
        setCurrentCity(res.name);
        console.log(res.weather[0].main);
      })
      .catch((error) => console.error(`Error${error}`));
    clothesApi
      .getClothes()
      .then((res) => {
        setDefaultClothes(res.response);
      })
      .catch((error) => console.error(`Error${error}`));
  }, [token]);

  const handleToken = (token) => {
    checkToken(token)
      .then((res) => {
        setUser(res.response);
        setOpenLoginModal(false);
        setOpenRegisterModal(false);
        setToken(token);
      })
      .catch((error) => {
        console.error("Error token invalid:", error);
      });
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    console.log(currentToken);
    if (currentToken) {
      handleToken(currentToken);
    }
  }, []);

  const handleAddNewClothes = ({ newGarment, setItemName, setItemUrl }) => {
    clothesApi
      .addNewClothes(newGarment)
      .then((response) => {
        setDefaultClothes((previeusDefaultClothes) => [
          newGarment,
          ...previeusDefaultClothes,
        ]);
        handleCloseModal();
        setItemName("");
        setItemUrl("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (card) => {
    clothesApi
      .deleteClothes(card._id)
      .then((res) => {
        const updatedClothes = defaultClothes.filter((item) => {
          return item._id !== card._id;
        });
        setDefaultClothes(updatedClothes);
        handleCloseModal();
      })
      .catch((error) => console.error(error));
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  //this state handles the preview item modal
  const handleOpenPreviewModal = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleOpenProfileModal = () => {
    setEditOpenProfileModal(true);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "c") {
      setcurrentTemperatureUnit("f");
    } else if (currentTemperatureUnit === "f") {
      setcurrentTemperatureUnit("c");
    }
  };
  const handleAddLikeItem = (card) => {
    const { _id: id, isLiked } = card;
    const token = localStorage.getItem("token");
    if (isLiked) {
      clothesApi
        .diskikeItem(id, token)
        .then((card) => {
          setDefaultClothes((cards) =>
            cards.map((c) => (c._id === id ? card.data : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      clothesApi
        .likeItem(id, token)
        .then((card) => {
          setDefaultClothes((cards) =>
            cards.map((c) => (c._id === id ? card.data : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("token", res.token);
          setOpenLoginModal(false);
        }
      })
      .catch((error) => {
        console.error("Incorrect email or password", error);
      });
  };
  const handleRegistration = (name, avatar, email, password) => {
    auth
      .signUp(name, avatar, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  const handleEditProfile = (name, avatar) => {
    const token = localStorage.getItem("token");
    usersApi
      .updateUser(name, avatar, token)
      .then((res) => {
        handleToken(token);
        setEditOpenProfileModal("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <ClothingItemsContext.Provider value={{ defaultClothes }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <CurrentUserContext.Provider value={user}>
            <section className="Header">
              <Header
                onCreateModal={handleCreateModal}
                city={currentCity}
                onSignOut={handleSignOut}
                onLogin={() => {
                  setOpenLoginModal(true);
                }}
                onRegister={() => {
                  setOpenRegisterModal(true);
                }}
              />
            </section>
            <Switch>
              <ProtectedRoute
                path="/profile"
                auth={!!user}
                component={Profile}
                onSelectCard={handleOpenPreviewModal}
                onItemLike={handleAddLikeItem}
                onCreateModal={handleCreateModal}
                defaultClothingItems={defaultClothes}
                setUser={setUser}
                openEditProfile={handleOpenProfileModal}
                signOut={handleSignOut}
              />
              <Route exact path="/">
                <Main
                  temperature={currentTemperature}
                  onClickedCard={handleOpenPreviewModal}
                  clothingItems={defaultClothes}
                />
              </Route>
              <Route path="/profile">
                <Profile
                  clothingItems={defaultClothes}
                  onClickedCard={handleOpenPreviewModal}
                  onCreateModal={handleCreateModal}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                  setUser={setUser}
                />
              </Route>
            </Switch>
            <section></section>
            <section className="page__footer">
              <Footer />
            </section>
            {activeModal === "create" && (
              <AddItemModal
                defaultClothes={defaultClothes}
                onCloseModal={handleCloseModal}
                handleAddNewClothes={handleAddNewClothes}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                name={"preview"}
                item={selectedCard}
                onCloseModal={handleCloseModal}
                onDelete={handleDelete}
              />
            )}
            {openLoginModal === true && (
              <LoginModal
                isOpen={openLoginModal}
                onClose={() => setOpenLoginModal(false)}
                onLogin={handleLogin}
                toRegister={() => {
                  setOpenRegisterModal(true);
                  setOpenLoginModal(false);
                }}
              />
            )}
            {openRegisterModal === true && (
              <RegisterModal
                isOpen={openRegisterModal}
                onClose={setOpenRegisterModal(false)}
                onRegistration={handleRegistration}
                // toLogin={() => {
                //   setOpenLoginModal(true);
                //   setOpenRegisterModal(false);
                // }}
              />
            )}
            {openEditProfileModal === true && (
              <EditProfileModal
                isOpen={openEditProfileModal}
                onClose={() => {
                  setEditOpenProfileModal(false);
                }}
                onUpdateUser={handleEditProfile}
              />
            )}
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemsContext.Provider>
    </div>
  );
}

export default App;
