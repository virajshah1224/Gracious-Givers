// Author: Jay Bhagvanbhai Sonani (B00891984)

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
import './styles/DonationForm.css';

const DonationForm = () => {


    const { state } = useLocation();
    const { id, name, image } = state;

    let validForm = true;
    let navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        console.log(name);

    });


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");

    const [fnameError, setFnameError] = useState(false);
    const [lnameError, setLnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    const [fnameErrorText, setFnameErrorText] = useState("");
    const [lnameErrorText, setLnameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [amountErrorText, setAmountErrorText] = useState("");

    let errorText = "";



    function validateEmail(input) {
        let email_validator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (input.match(email_validator)) {
            setEmail(input);
        } else {
            validForm = false;
            errorText = "Email is invalid!";
        }

    }

    function validateForm() {



        if (fname === "") {
            setFnameError(true);
            setFnameErrorText("First name is required.");
            validForm = false;
        }
        if (lname === "") {
            setLnameError(true);
            setLnameErrorText("Last name is required.")
            validForm = false;
        }
        if (email === "") {
            setEmailError(true);
            setEmailErrorText("Email is required.");
            validForm = false;
        } else {
            validateEmail(email);
        }
        if (amount === "") {
            setAmountError(true);
            setAmountErrorText("Amount is required.")
            validForm = false;
        }
        if (amount === "0") {
            setAmountError(true);
            errorText += "\nAmount must be greater than 0.";
            validForm = false;
        }
        if (parseInt(amount) > 10000) {
            setAmountError(true);
            errorText += "\nAmount cannot exceed 10000.";
            validForm = false;
        }

        if (validForm) {
            navigate("/payment", { state: { id, name, amount, fname, lname, email } });
            console.log("Form validated");
        } else {
            if (errorText.length > 0) {
                alert(errorText);
                errorText = "";
            }
            console.log("Invalid form");
        }

    }

    function resetForm() {
        setFname("");
        setLname("");
        setEmail("");
        setAmount(0);
        setFnameError(false);
        setLnameError(false);
        setEmailError(false);
        setAmountError(false);
    }

    return (
        <div style={{ backgroundImage: `url(${image})` }} className="formBg">
            <Header />
            <div className="blur-form-bg">
                <div className="form">

                    <div className="title">
                        Donation for "{name}"
                    </div>
                    <br />

                    <div className="heading">
                        Enter details for your donation
                    </div>
                    <br />

                    <div className="rowForm">
                        <div className="labels">Donor's first name:</div>
                        <Form.Control required className={fnameError && "redError"} placeholder={fnameError ? fnameErrorText : "Enter your first name"} value={fname} type="text" onChange={e => setFname(e.target.value)} />
                    </div>

                    <div className="rowForm">
                        <div className="labels">Donor's last name:</div>
                        <Form.Control required className={lnameError && "redError"} placeholder={lnameError ? lnameErrorText : "Enter your last name"} value={lname} type="text" onChange={e => setLname(e.target.value)} />
                    </div>

                    <div className="rowForm">
                        <div className="labels">Donor's email:</div>
                        <Form.Control required className={emailError && "redError"} placeholder={emailError ? emailErrorText : "Enter your email address"} value={email} type="text" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="rowForm">
                        <div className="labels">Donation amount:</div>
                        <Form.Control required className={amountError && "redError"} placeholder={amountError ? amountErrorText : "Enter the amount"} value={amount} type="text" onChange={e => setAmount(e.target.value)} />
                    </div>
                    <br />

                    <div className="abc">
                        <Button className="resetButton" variant="outline-primary" onClick={resetForm} >Reset</Button>
                        <Button className="donateButton" variant="primary" onClick={validateForm} >Donate</Button>
                    </div>

                    <div className="rowForm">
                    </div>

                </div >
            </div>
            <Footer />
        </div>
    );
}

export default DonationForm;