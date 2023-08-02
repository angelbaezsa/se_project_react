import "./ModalWithForm.css";
import React, { useState } from "react";

function ModalWithForm({ children, onCloseModal, submitEvent, name }) {
  return (
    <>
      <div className={`modal modal_type_${name}`}>
        <div className="modal_content">
          <button
            className="form_close-button close-button"
            onClick={onCloseModal}
          ></button>
          <h3 className="form_title">{name}</h3>
          <form action="submit" onSubmit={submitEvent}>
            {children}
            <button className="form__button-submit" type="submit">
              Add Garment
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
}
export default ModalWithForm;
