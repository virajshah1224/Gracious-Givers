/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Register from "../../pages/user_management/Register";

export default function RegisterModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a variant="primary" className="" style={{cursor: 'pointer'}} onClick={handleShow}>
        Don't have an account - NGO Register
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NGO Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
      </Modal>
    </>
  );
}
