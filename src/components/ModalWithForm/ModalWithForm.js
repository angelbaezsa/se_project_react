//From now on you need to pack the whole markup of each modal in it's own file
//(you shouldn't have only inputs in AddItemModal.js). Everything should be in AddItemModal.js
//including handleSubmit and so on.
import "./ModalWithForm.css";
import React from "react";
import { useState } from "react";

function ModalWithForm({ children, onCloseModal, submitEvent, name }) {
  return (
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
            {name}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
