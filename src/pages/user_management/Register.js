/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
import { React, Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { redirectUser } from "../../utils/Network";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formField: {
        user_id: "",
        email: "",
        password: "",
        cpassword: "",
        ngo_name: "",
        target_group: "",
        description: "",
      },
      formErrors: {
        user_id: "",
        email: "",
        password: "",
        cpassword: "",
        ngo_name: "",
        target_group: "",
        description: "",
        apiresponses: "",
      },
      formSuccess: {
        apiresponses: "",
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

  validateForm = () => {
    console.log("Validating the form");
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
            {this.state.formErrors.apiresponses.message}
          </div>
        </div>
      );
    }
  };

  showSuccess = () => {
    if (this.state.formSuccess.apiresponses) {
      return (
        <div>
          <div
            style={{ margin: 20 + "px" }}
            class="alert alert-success"
            role="alert"
          >
            {this.state.formSuccess.apiresponses}
          </div>
        </div>
      );
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
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
    } else if (email.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          email: "Please enter an email address",
        },
      });
    } else if (password.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          password: "Please enter a password",
        },
      });
    } else if (password !== this.state.formField.cpassword) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          cpassword: "Password and confirm password does not match",
        },
      });
    } else if (this.state.formField.ngo_name.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          ngo_name: "Please enter all the ngo name",
        },
      });
    } else if (this.state.formField.target_group.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          target_group: "Please enter all the target group",
        },
      });
    } else if (this.state.formField.description.length === 0) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          description: "Please enter the description",
        },
      });
    } else {
      axios
        .post("https://gracious-givers-backend.herokuapp.com/auth/register", {
          email: this.state.formField.email,
          password: this.state.formField.password,
          user_id: this.state.formField.user_id,
          ngo_name: this.state.formField.ngo_name,
          target_group: this.state.formField.target_group,
          description: this.state.formField.description,
        })
        .then(function (response) {
          console.log(response);
          alert("User Registered Successfully");
          redirectUser("/");
        })
        .catch((error) => {
          console.log("Catch block");
          console.log(error);
          if (error && error.response && error.response.data) {
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
  toggleTargetGroup = (event) => {
    console.log(event);
    const value = event.target.value;
    console.log(value);
  };

  render() {
    const formField = this.state.formField;
    const formError = this.state.formErrors;

    return (
      <>
        <Container className="mb-5" id="create-ngo-form">
          <Form noValidate onSubmit={this.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  required
                  name="user_id"
                  type="text"
                  placeholder="Please enter the userid"
                  value={formField.user_id}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.user_id}
                />
                <Form.Control.Feedback type="invalid">
                  {formError.user_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="email"
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
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  type="password"
                  placeholder="Please enter the Password"
                  value={formField.password}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formError.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom04">
                <Form.Label>Confirm the Password</Form.Label>
                <Form.Control
                  required
                  name="cpassword"
                  type="password"
                  placeholder="Please confirm the Password"
                  value={formField.cpassword}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.cpassword}
                />
                <Form.Control.Feedback type="invalid">
                  {formError.cpassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom05">
                <Form.Label>NGO name</Form.Label>
                <Form.Control
                  required
                  name="ngo_name"
                  type="text"
                  placeholder="Please enter the NGO name"
                  value={formField.ngo_name}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.ngo_name}
                />

                <Form.Control.Feedback type="invalid">
                  {formError.ngo_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom06">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  name="description"
                  type="text"
                  placeholder="Please enter the NGO Description"
                  value={formField.description}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.description}
                />

                <Form.Control.Feedback type="invalid">
                  {formError.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom07">
                <Form.Label>Target Group</Form.Label>
                <Form.Control
                  required
                  name="target_group"
                  type="text"
                  placeholder="Please enter the target group (Eg: Children,social welfare)"
                  value={formField.target_group}
                  onChange={this.handleValueChange}
                  isInvalid={!!formError.target_group}
                />

                <Form.Control.Feedback type="invalid">
                  {formError.target_group}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {this.showError()}
            {this.showSuccess()}
            <Button
              variant="primary"
              type="submit"
              className="custom-btn-header"
            >
              Register
            </Button>
            <Row className="mb-3" style={{ height: "40px" }}>
              <Col></Col>
            </Row>
          </Form>
        </Container>
      </>
    );
  }
}
//export default Register;
