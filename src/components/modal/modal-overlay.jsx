import classes from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => {
  return <div className={classes.modalOverlay} onClick={closeModal} />;
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalOverlay;
