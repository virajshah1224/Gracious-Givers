/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { React, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Header from "../../components/navbar/Header";
import Footer from "../../components/navbar/Footer";
import axios from "axios";

const ForgotPassword = () => {
  const [formField, setFormField] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const [formSucesss, setFormSuccess] = useState({
    email: "",
  });

  const showError = () => {
    if (formErrors.email) {
      return (
        <div>
          <div
            style={{ marginTop: 20 + "px", marginBottom: 20 + "px" }}
            class="alert alert-danger"
            role="alert"
          >
            {formErrors.email}
          </div>
        </div>
      );
    }
  };

  const showSuccess = () => {
    if (formSucesss.email) {
      return (
        <div>
          <div
            style={{ marginTop: 20 + "px", marginBottom: 20 + "px" }}
            class="alert alert-success"
            role="alert"
          >
            {formSucesss.email}
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

  const handleForgotPassword = (event) => {
    event.preventDefault();
    let email = formField.email;
    var validEmailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      setFormErrors({
        ...formErrors,
        email: "Email is required",
      });
    }
    if (email && !validEmailRegex.test(email)) {
      setFormErrors({
        ...formErrors,
        email: "Please enter a valid email address",
      });
    } else {
      axios
        .post("https://gracious-givers-backend.herokuapp.com/auth/forgotPwd", {
          email: formField.email,
        })
        .then((response) => {
          console.log(response);
          setFormSuccess({
            status: true,
            email: response.data.message,
          });
          setFormErrors({
            status: false,
            email: "",
          });
        })
        .catch((error) => {
          console.log(error);
          setFormErrors({
            status: true,
            email: error.response.data.message,
          });
        });
    }
  };

  return (
    <div>
      <Header />
      <Container className="forgot-password-form">
        <Row>
          <Col xs={0} md={3}></Col>
          <Col xs={12} md={6}>
            <Row className="mb-3">
              <Col>
                <h4 id="create-update-form-label">Forgot Password</h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <Row>
          <Col xs={0} md={3}></Col>
          <Col xs={12} md={6}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleValueChange}
                  value={formField.email}
                />
              </Form.Group>
              <Row className="mb-3 mt-3">
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleForgotPassword}
                  >
                    Submit
                  </Button>
                  {showError()}
                  {showSuccess()}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
