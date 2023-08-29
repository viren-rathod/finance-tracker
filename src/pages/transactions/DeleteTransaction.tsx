import React from "react";
import { danger } from "../../utils/icons";
import Modals from "../../others/Modal";
import useFinanceContext from "../../Context/FinanceContext";

const DeleteTransaction = ({
  setShowModal,
  showModal,
  id,
  setTempData,
}: any) => {
  const [transactions, setTransactions] = useFinanceContext();

  const handleDelete = () => {
    let updatedData = transactions.filter((item) => item.key !== id);
    setTransactions(updatedData);
    setTempData(updatedData);
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
