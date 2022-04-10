/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import axios from "axios";
import { React, Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { authenticateUser, redirectUser } from "../../utils/Network";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formField: {
        email: "",
        password: "",
        apiresponses: "",
      },
      formErrors: {
        email: "",
        password: "",
      },
      // validated: false
    };
  }

  handleValueChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const fields = { ...this.state.formField };
    fields[field] = value;
    this.setState({ formField: fields });

    // Remove error on the field
    if (!!this.state.formErrors[field]) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          [field]: null,
        },
      });
    }
  };

  showError = () => {
    if (this.state.formErrors.apiresponses) {
      return (
        <div>
          <div
            style={{ margin: 20 + "px" }}
            class="alert alert-danger"
            role="alert"
          >
            {this.state.formErrors.apiresponses}
          </div>
        </div>
      );
    }
  };

  validateForm = () => {
    console.log("Validating the form");
  };

  handleUserLogin = (event) => {
    event.preventDefault();
    this.validateForm();
    let email = this.state.formField.email;
    let password = this.state.formField.password;
    var validEmailRegex = /\S+@\S+\.\S+/;
    if (email && !validEmailRegex.test(email)) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          email: "Please enter a valid email address",
        },
      });
    } else if (password.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          password: "Please enter a password",
        },
      });
    } else {
      axios
        .post("https://gracious-givers-backend.herokuapp.com/auth/login/ngo", {
          email: this.state.formField.email,
          password: this.state.formField.password,
        })
        .then(function (response) {
          console.log(response);
          authenticateUser(response);
          redirectUser("/ngo/fundraiser");
        })
        .catch((error) => {
          console.log("Catch block");
          console.log(error);
          if (error.response.data) {
            console.log(error.response.data.message);
            this.setState({
              formErrors: {
                ...this.state.formErrors,
                apiresponses: error.response.data.message,
              },
            });
          } else {
            console.log(error);
          }
        });
    }
    //}
  };
  render() {
    const formField = this.state.formField;
    const formError = this.state.formErrors;
    return (
      <>
        <Container className="mb-5" id="login-ngo-form">
          <Form noValidate onSubmit={this.handleUserLogin}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="email"
                  style={{ width: "300" + "px" }}
                  placeholder="Please enter the email"
                  value={formField.email}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formError.email}
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
                  style={{ width: "300" + "px" }}
                  placeholder="Please enter the password"
                  value={formField.password}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formError.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {this.showError()}
            <Button
              variant="primary"
              className="custom-btn-header"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
