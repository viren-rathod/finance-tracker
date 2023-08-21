import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../others/NavBar";
import { Card, ListGroup } from "react-bootstrap";
import { goBack, rupee } from "../../utils/icons";
import useFinanceContext from "../../Context/FinanceContext";

const TransactionInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // let allTransactions = JSON.parse(
  //   localStorage.getItem("transactions") || "[]"
  // );
  const [allTransactions] = useFinanceContext();
  const [cardData] = allTransactions.filter(
    (data: any) => parseInt(data.key) === parseInt(id || "")
  );
  console.log("cardData", cardData);

  return (
    <>
      <NavBar />
      <Card className="main" style={{ width: "25rem", margin: "5rem auto" }}>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <span>
            <Card.Link
              className="py-1 px-2"
              role="button"
              onClick={() => navigate(-1)}
            >
              {goBack}
            </Card.Link>
          </span>
          <span className="badge rounded-pill text-bg-warning">
            ID : {cardData.key}
          </span>
        </Card.Body>
        <Card.Img variant="top" src={cardData.receipt} />
        <Card.Body>
          <Card.Title>
            <span>Transaction : {cardData.transactionType}</span>
          </Card.Title>
          <Card.Text>{cardData.notes}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Date : {cardData.tDate}</ListGroup.Item>
          <ListGroup.Item>From : {cardData.fromAccount}</ListGroup.Item>
          <ListGroup.Item>To : {cardData.toAccount}</ListGroup.Item>
          <ListGroup.Item>
            Ammount : {rupee} {cardData.amount}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default TransactionInfo;
