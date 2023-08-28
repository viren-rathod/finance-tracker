import React from "react";
import { danger } from "../../utils/icons";
import Modals from "../../others/Modal";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../Store/slices/financeSlice";

const DeleteTransaction = ({ setShowModal, showModal, id }: any) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTransaction(id));
    setShowModal(false);
  };

  return (
    <Modals
      setShowModal={setShowModal}
      showModal={showModal}
      title={"Delete"}
      icon={danger}
      message={"Are you sure you want to Delete this Transaction ?"}
      onClick={handleDelete}
      YesBtn={"Yes"}
    />
  );
};

export default DeleteTransaction;

/*<>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {danger} Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Delete this Transaction ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            autoFocus
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>*/
