import React from "react";
import { Modal } from "react-bootstrap";

const Modals = ({
  setShowModal,
  showModal,
  title,
  icon,
  message,
  onClick = setShowModal,
  YesBtn,
  NoBtn,
}: any) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {icon}
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button
            autoFocus
            onClick={() => setShowModal(false)}
            className="custom-btn btn-save"
          >
            {NoBtn ? NoBtn : "No"}
          </button>
          <button onClick={onClick} className="custom-btn btn-save">
            {YesBtn}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
