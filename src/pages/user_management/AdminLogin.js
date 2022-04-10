/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { React, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { authenticateUser, redirectUser } from "../../utils/Network";

const AdminLogin = () => {
  const [formField, setFormField] = useState({
    username: "",
    password: "",
    security_a1: "",
    security_a2: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    security_a1: "",
    security_a2: "",
  });

  const showError = () => {
    if (formErrors.status) {
      return (
        <div>
          <div
            style={{ margin: 20 + "px" }}
            class="alert alert-danger"
            role="alert"
          >
            {formErrors.message}
          </div>
        </div>
      );
    }
  };

  const handleValueChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setFormField({
      ...formField,
      [field]: value,
    });

    if (!formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: null,
      });
    }
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    let message = "";
    setFormErrors({
      ...formErrors,
      status: true,
      message: message,
    });
    if (!formField.username) {
      message = "Username is required";
      setFormErrors({
        ...formErrors,
        status: true,
        message: message,
      });
    }
    if (!formField.password) {
      message = "Password is required";
      setFormErrors({
        ...formErrors,
        status: true,
        message: message,
      });
    }
    if (!formField.security_a1) {
      message = "Security Answer is required";
      setFormErrors({
        ...formErrors,
        status: true,
        message: message,
      });
    }
    if (!formField.security_a2) {
      message = "Security Answer is required";
      setFormErrors({
        ...formErrors,
        status: true,
        message: message,
      });
      return;
    } else {
      axios
        .post("https://gracious-givers-backend.herokuapp.com/auth/login/admin", {
          username: formField.username,
          password: formField.password,
          security_a1: formField.security_a1,
          security_a2: formField.security_a2,
        })
        .then(function (response) {
          console.log(response);
          authenticateUser(response);
          redirectUser("/admin");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container className="mb-5" id="login-admin-form">
        <Form noValidate onSubmit={handleAdminLogin}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>User name</Form.Label>
              <Form.Control
                required
                name="username"
                type="text"
                placeholder="Please enter the username"
                value={formField.username}
                onChange={handleValueChange}
                isInvalid={!!formErrors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                type="password"
                placeholder="Please enter the password"
                value={formField.password}
                onChange={handleValueChange}
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label>What is your favorite color?</Form.Label>
              <Form.Control
                required
                name="security_a1"
                type="text"
                placeholder="Please enter the answer"
                value={formField.security_a1}
                onChange={handleValueChange}
                isInvalid={!!formErrors.security_a1}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.security_a1}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom04">
              <Form.Label>What is your favorite food?</Form.Label>
              <Form.Control
                required
                name="security_a2"
                type="text"
                placeholder="Please enter the answer"
                value={formField.security_a2}
                onChange={handleValueChange}
                isInvalid={!!formErrors.security_a2}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.security_a2}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {showError()}
          <Button variant="primary" type="submit" className="custom-btn-header">
            Login
          </Button>

          <Row className="mb-3" style={{ height: "40px" }}>
            <Col></Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AdminLogin;
