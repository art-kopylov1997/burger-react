import { useEffect } from "react";

import classes from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ title, closeModal, children }) => {
  const divModals = document.getElementById("modals");

  function handleKeyDown(event) {
    if (event.code === "Escape") {
      closeModal();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={`${classes.modalContent} pt-10 pr-10 pl-10 pb-15`}>
        <div className={classes.blockTitles}>
          <p className="text text_type_main-large">{title}</p>

          <div className={classes.closeIconWrapper} onClick={closeModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </>,
    divModals
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
