import "./RegisterModal.css";

import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, onRegistration, ...props }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // const isEmailValid = ({ email }) => {
  //   return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email); //regex for email validation
  // };
  // const isPasswordValid = (password) => {
  //   //check that password length is not shorter than specified
  //   return password.length >= 6;
  // };

  // useEffect(() => {
  //   setIsFormValid((email, password, name) => {
  //     return (
  //       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) && //email validation
  //       password.length >= 6 &&
  //       name.length > 0
  //     );
  //   });
  // }, [email, password, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration({
      name: name,
      avatar: avatar,
      email: email,
      password: password,
    });
  };

  return (
    <ModalWithForm
      submitEvent={handleSubmit}
      onCloseModal={onClose}
      name={"Register today!"}
    >
      <div>
        <label className="form__input-label">
          Name
          <input
            className={`form__input input_type_name`}
            type="text"
            placeholder="Name"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label">
          Avatar
          <input
            className={`form__input input_type_avatar `}
            type="text"
            placeholder="URL"
            required
            onChange={(event) => {
              setAvatar(event.target.value);
            }}
          />
        </label>
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
            className={`form__input input_type_password`}
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

export default RegisterModal;
