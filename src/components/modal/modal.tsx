import { FC, ReactNode, useEffect } from "react";

import classes from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  title: string;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<IModal> = ({ title, closeModal, children }) => {
  function handleKeyDown(event: KeyboardEvent) {
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
    document.getElementById("modals")!
  );
};

export default Modal;
