import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
import { clothesApi } from "../../utils/ClothesApi";
import { usersApi } from "../../utils/UsersApi";
import ClothesSection from "../ClothesSection/CothesSection";

function App() {
  //this state handles the add item modal
  const [activeModal, setActiveModal] = useState("");
  //this state handles the selected cards
  const [selectedCard, setSelectedCard] = useState({}); // selects a card item to display in modal
  const [currentTemperature, setCurrentTemperature] = useState(null); //holds temperature from API res
  const [currentCity, setCurrentCity] = useState(""); //holds city from API res
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("f"); //Farenheit || Celsius
  const [defaultClothes, setDefaultClothes] = useState([]); //clothes from Array given in sprint 9
  const [user, setUser] = useState(null);
  const [openEditProfileModal, setEditOpenProfileModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [token, setToken] = useState(null);
  const history = useHistory();
  // import  from "../context/CurrentTemperatureUnitContext";

  // const clothesApi = new ClothesApi({ baseUrl });
  // const usersApi = new UsersApi({ baseUrl });

  //this effect charges the weather api and clothing items on page load

  useEffect(() => {
    getWeather()
      .then((res) => {
        const forecast = parseWeatherForecast(res); //returns an object of type forecast
        setCurrentTemperature(forecast);
        setCurrentCity(res.name);
      })
      .catch((error) => console.error(`Error${error}`));
    // clothesApi
    //   .getClothes()
    //   .then((res) => {
    //     setDefaultClothes(res.response);
    //   })
    //   .catch((error) => console.error(`Error${error}`));
  }, [token]);
  console.log(`defaultClothes`, defaultClothes);
  useEffect(() => {
    clothesApi
      .getClothes()
      .then((res) => {
        setDefaultClothes(res.response);
      })
      .catch((error) => console.error(`Error${error}`));
  }, []);

  const handleToken = (token) => {
    checkToken(token)
      .then((res) => {
        setUser(res.response);
        // setActiveModal("");
        handleCloseModal();
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
        console.log("response", response.data);
        setDefaultClothes((previeusDefaultClothes) => [
          response.data,
          ...previeusDefaultClothes,
        ]);
        // window.location.reload();
        handleCloseModal();
        setItemName("");
        setItemUrl("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (card) => {
    clothesApi
      .deleteClothes(card._id, token)
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
    console.log(card);
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
        console.log(res);
        if (res && res.token) {
          localStorage.setItem("token", res.token);
          handleToken(res.token);
          handleCloseModal();
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Incorrect email or password", error);
      });
  };
  function handleRegistration({ name, avatar, email, password }) {
    auth
      .signUp(name, avatar, email, password)
      .then((res) => {
        console.log(res);
        handleLogin({ email, password });
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
                  setActiveModal("login");
                }}
                onRegister={() => {
                  setActiveModal("register");
                }}
              />
            </section>
            <Switch>
              <ProtectedRoute
                path="/profile"
                auth={!!user}
                component={Profile}
                onClickedCard={handleOpenPreviewModal}
                onLikeItem={handleAddLikeItem}
                onCreateModal={handleCreateModal}
                defaultClothingItems={defaultClothes}
                setUser={setUser}
                openEditProfile={() => {
                  setActiveModal("edit");
                }}
                onEditProfile={handleEditProfile}
                signOut={handleSignOut}
              />
              <Route exact path="/">
                <Main
                  temperature={currentTemperature}
                  onClickedCard={handleOpenPreviewModal}
                  clothingItems={defaultClothes}
                  onLikeItem={handleAddLikeItem}
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
            {activeModal === "login" && (
              <LoginModal
                isOpen={openLoginModal}
                onClose={handleCloseModal}
                onLogin={handleLogin}
                toRegister={() => {
                  setActiveModal("register");
                }}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                // isOpen={openRegisterModal}
                onClose={() => {
                  setActiveModal("");
                }}
                onRegistration={handleRegistration}
                toLogin={() => {
                  setActiveModal("login");
                }}
              />
            )}
            {activeModal === "edit" && (
              <EditProfileModal
                isOpen={openEditProfileModal}
                onClose={() => {
                  setActiveModal("");
                }}
                onUpdateUser={handleEditProfile}
                // user={user}
              />
            )}
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </ClothingItemsContext.Provider>
    </div>
  );
}

export default App;
