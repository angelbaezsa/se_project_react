import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isUrlValid = (avatar) => {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(avatar);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    onUpdateUser(name, avatar);
  };

  return (
    <ModalWithForm
      onCloseModal={onClose}
      submitEvent={handleUpdateUser}
      name={"Edit Profile"}
    >
      <div>
        <label className="form__input-label">
          Name
          <input
            className={`form__input input_type_name ${
              name.length < 1 ? "form_input_invalid" : ""
            }`}
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
            className={`form__input input_type_avatar ${
              isUrlValid(avatar) ? "" : "form_input_invalid"
            }`}
            type="text"
            placeholder="URL"
            required
            onChange={(event) => {
              setAvatar(event.target.value);
            }}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
