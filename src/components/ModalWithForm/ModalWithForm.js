import "./ModalWithForm.css";
import React, { useState } from "react";

function ModalWithForm({
  children,
  buttonText = "Add Garment",
  onCloseModal,
  submitEvent,
  name,
}) {
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
            <button type="submit">{buttonText}</button>{" "}
          </form>
        </div>
      </div>
    </>
  );
}
export default ModalWithForm;
