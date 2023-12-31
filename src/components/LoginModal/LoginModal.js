import "./LoginModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState("");

  // const isEmailValid = ({ email }) => {
  //   return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email); //regex for email validation
  // };
  const isPasswordValid = (password) => {
    //check that password length is not shorter than specified
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (isPasswordValid(password)) {
      setValidForm("true");
      onLogin({ email, password });
    }
    setValidForm("false");
  };

  return (
    <ModalWithForm
      onCloseModal={onClose}
      submitEvent={handleSubmit}
      name={"Log in"}
    >
      <div>
        <label className="form__input-label">
          Email
          <input
            className={`form__input input_type_email `}
            type="email"
            placeholder="Email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label" type="text">
          password
          <input
            className={`form__input input_type_password ${
              isPasswordValid ? "" : "form_input_invalid"
            }`}
            type="password"
            placeholder="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
