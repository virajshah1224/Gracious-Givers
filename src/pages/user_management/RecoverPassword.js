/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { React, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Header from "../../components/navbar/Header";
import Footer from "../../components/navbar/Footer";
import axios from "axios";
import { redirectUser } from "../../utils/Network";
import { useParams } from "react-router-dom";

const RecoverPassword = () => {
  const [formField, setFormField] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

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
  // extract the email from the params hook
  const { email } = useParams();

  const showError = () => {
    if (formErrors.cpassword) {
      return (
        <div>
          <div
            style={{ margin: 20 + "px" }}
            class="alert alert-danger"
            role="alert"
          >
            {formErrors.cpassword}
          </div>
        </div>
      );
    }
  };

  const handleRecoverPassword = (event) => {
    //check for empty fields
    event.preventDefault();
    if (
        formField.password === "" ||
        formField.cpassword === "") {
        setFormErrors({
            ...formErrors,
            password: "Password cannot be empty",
            cpassword: "Confirm Password cannot be empty",
        });

    }
    //check the password and confirm password
    else if (formField.password !== formField.cpassword) {
      setFormErrors({
        ...formErrors,
        cpassword: "Password and confirm password do not match",
      });
    } else {
    event.preventDefault();
    axios
      .post("https://gracious-givers-backend.herokuapp.com/auth/recoverPwd", {
        email: email,
        password: formField.password,
      })
      .then((response) => {
        console.log(response);
        //authenticateUser(response.data.token);
        redirectUser("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="mb-5" id="recover-password-form">
        <Row>
          <Col xs={0} md={3}></Col>
          <Col xs={12} md={6}>
            <Row className="mb-3">
              <Col>
                <h4 id="create-update-form-label">Recover Password</h4>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form noValidate onSubmit={handleRecoverPassword}>
          <Row className="mb-3">
            <Form.Group as={Col} xs="5" md="5" controlId="validationCustom01">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                type="password"
                placeholder="Please enter the password"
                value={formField.password}
                onChange={handleValueChange}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs="5" md="5" controlId="validationCustom02">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                name="cpassword"
                type="password"
                placeholder="Please confirm the password"
                value={formField.cpassword}
                onChange={handleValueChange}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" className="custom-btn-header">
            Submit
          </Button>
          {showError()}
          <Row className="mb-3" style={{ height: "40px" }}>
            <Col></Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default RecoverPassword;
