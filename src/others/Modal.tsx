import React from "react";
import { Button, Modal } from "react-bootstrap";

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
          <Button
            variant="secondary"
            autoFocus
            onClick={() => setShowModal(false)}
          >
            {NoBtn ? NoBtn : "No"}
          </Button>
          <Button variant="primary" onClick={onClick}>
            {YesBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
