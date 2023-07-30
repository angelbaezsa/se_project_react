import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const temperature = "102°";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <section className="Header">
        <Header onCreateModal={handleCreateModal} />
      </section>
      <section>
        <Main temperature={temperature} />
      </section>
      <section className="page__footer">
        <Footer />
      </section>
      {activeModal === "create" && (
        <ModalWithForm name="Add-Clothes" onCloseModal={handleCloseModal}>
          <form>
            <label className="">
              Name
              <input
                className="form__input input_type_name"
                type="text"
                placeholder="Name"
              />
            </label>
            <label type="text">
              Image URL
              <input
                className="form__input input_type_url"
                type="text"
                placeholder="URL"
              />
            </label>
            <h4 className="form__label radio-button_label">
              Select weather type:
            </h4>
            <div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_hot"
                  type="radio"
                  name="weather"
                  id="hot"
                />
                <label>Hot</label>
              </div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_warm"
                  type="radio"
                  name="weather"
                  id="warm"
                />
                <label>Warm</label>
              </div>
              <div>
                <input
                  className="radio-button form__radio-button radio-button_type_cold"
                  type="radio"
                  name="weather"
                  id="cold"
                />
                <label>Cold</label>
              </div>
            </div>
          </form>
        </ModalWithForm>
      )}
    </div>
  );
}

export default App;
