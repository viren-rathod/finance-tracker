import React from "react";
import { danger } from "../../utils/icons";
import Modals from "../../others/Modal";

export interface transaction {
  tDate: string;
  monthYear: string;
  transactionType: string;
  fromAccount: string;
  toAccount: string;
  amount: string;
  receipt: string;
  notes: string;
  user: string;
  key: number;
}
const DeleteTransaction = ({
  setShowModal,
  showModal,
  id,
  setTempData,
}: any) => {
  const handleDelete = () => {
    const user = localStorage.getItem("activeUser");
    const userEmail: string = JSON.parse(user || "{}").email;
    let allData: transaction[] = [];
    allData = JSON.parse(localStorage.getItem("transactions") || "[]");
    allData = allData.filter(
      (item) => item.key !== id && item.user === userEmail
    );
    console.log(allData);
    localStorage.setItem("transactions", JSON.stringify(allData));
    setTempData(allData);
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
