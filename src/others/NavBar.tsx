import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut, logo, plus, warn } from "../utils/icons";
import { Button } from "react-bootstrap";
import Modals from "./Modal";

const NavBar = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const localUser = localStorage.getItem("activeUser");
  const user = JSON.parse(localUser || "");

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    nav("/login");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary py-3 fixed-top"
        style={{
          boxShadow:
            "0px 2px 10px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <div className="container container-fluid">
          <Link to="/home">
            {logo}
            <span className="navbar-brand text-light fw-semibold my-0 mx-3">
              Transactions
            </span>
          </Link>
          <div className="collapse navbar-collapse justify-content-between">
            <span className="navbar-nav">
              <Link to="/add">
                <Button variant="primary" className="text-light fw-bold">
                  <span>{plus}</span>
                  <span>Add Transaction</span>
                </Button>
              </Link>
            </span>
            <span className="d-flex justify-content-end align-items-center">
              <span className="badge rounded-pill text-bg-light fs-6 mx-4">
                {user?.username.toUpperCase()}
              </span>
              <Button
                variant="primary"
                className="text-light"
                onClick={handleShow}
              >
                <span>{logOut}</span>
                <span>Logout</span>
              </Button>
            </span>
          </div>
        </div>
      </nav>
      {
        <Modals
          setShowModal={handleClose}
          showModal={show}
          title={"Alert"}
          icon={warn}
          message={"Are you sure you want to Logout of the Application?"}
          onClick={handleLogout}
          YesBtn={"Yes"}
          NoBtn={"No"}
        />
      }
    </>
  );
};

export default NavBar;

/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {warn} Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Logout of the Application?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No,Stay Signed In!
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes Logout!
          </Button>
        </Modal.Footer>
      </Modal> */
