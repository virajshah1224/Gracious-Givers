/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import AdminLogin from "../../pages/user_management/AdminLogin";
import Login from "../../pages/user_management/Login";

export default function AdminLoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        type="button"
        variant="primary"
        className="custom-btn-header"
        id="admin-login-btn"
        onClick={handleShow}
        style={{ marginRight: "10px", maxWidth: "200px" }}
      >
        Admin Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login as Admin User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminLogin />
          <a variant="primary" className="" href="/ForgotPassword">
            Forgot Password
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}
