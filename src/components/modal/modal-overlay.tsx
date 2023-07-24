import classes from "./modal.module.css";
import { FC } from "react";

interface IModalOverlay {
  closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
  return <div className={classes.modalOverlay} onClick={closeModal} />;
};

export default ModalOverlay;
