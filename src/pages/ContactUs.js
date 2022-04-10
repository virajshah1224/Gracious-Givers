// Author: Jay Bhagvanbhai Sonani (B00891984)

import { useState } from "react";
import Footer from "../components/navbar/Footer";
import Header from "../components/navbar/Header";
import '../components/donation/styles/DonationForm.css';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
var axios = require('axios');



const ContactUs = () => {

    let validForm = true;
    let errorText = "";
    let navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const [fnameError, setFnameError] = useState(false);
    const [lnameError, setLnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [fnameErrorText, setFnameErrorText] = useState("");
    const [lnameErrorText, setLnameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [subjectErrorText, setSubjectErrorText] = useState("");
    const [descriptionErrorText, setDescriptionErrorText] = useState("");



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
        if (subject === "") {
            setSubjectError(true);
            setSubjectErrorText("Subject is required.")
            validForm = false;
        }

        if (description === "") {
            setDescriptionError(true);
            setDescriptionErrorText("Description is required.")
            validForm = false;
        }


        if (validForm) {
            // navigate("/payment", { state: { id, name, amount, fname, lname, email } });
            console.log("Form validated");
            sendEmail();

        } else {
            if (errorText.length > 0) {
                alert(errorText);
                errorText = "";
            }
            console.log("Invalid form");
        }

    }

    function sendEmail() {

        var data = JSON.stringify({
            "firstName": fname,
            "lastName": lname,
            "email": email,
            "subject": subject,
            "description": description,
        });

        var config = {
            method: 'post',
            url: 'https://gracious-givers-backend.herokuapp.com/contact_us',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.success === true) {
                    alert("Your message has been sent successfully to the admin.");
                    navigate("/");
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                alert("Error occurred!\n" + error)
                console.log(error);
            });


    }


    function validateEmail(input) {
        let email_validator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (input.match(email_validator)) {
            setEmail(input);
        } else {
            validForm = false;
            errorText = "Email is invalid!";
        }

    }





    return (
        <div>
            <Header />
            <div className="form">
                <div className="title">
                    Enter your details
                </div>
                <br /><br />

                <div className="rowForm">
                    <div className="labels">First name:</div>
                    <Form.Control required className={fnameError && "redError"} placeholder={fnameError ? fnameErrorText : "Enter your first name"} value={fname} type="text" onChange={e => setFname(e.target.value)} />
                </div>

                <div className="rowForm">
                    <div className="labels">Last name:</div>
                    <Form.Control required className={lnameError && "redError"} placeholder={lnameError ? lnameErrorText : "Enter your last name"} value={lname} type="text" onChange={e => setLname(e.target.value)} />
                </div>

                <div className="rowForm">
                    <div className="labels">Email:</div>
                    <Form.Control required className={emailError && "redError"} placeholder={emailError ? emailErrorText : "Enter your email address"} value={email} type="text" onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="rowForm">
                    <div className="labels">Subject:</div>
                    <Form.Control required className={subjectError && "redError"} placeholder={subjectError ? subjectErrorText : "Enter the subject"} value={subject} type="text" onChange={e => setSubject(e.target.value)} />
                </div>

                <div className="rowForm">
                    <div className="labels">Description:</div>
                    <Form.Control required className={descriptionError && "redError"} placeholder={descriptionError ? descriptionErrorText : "Enter the description"} value={description} type="text" onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="rowForm">
                    <Button className="donateButton" variant="primary" onClick={validateForm}  >Submit</Button>
                </div>


            </div >
            <Footer />
        </div>
    );
}

export default ContactUs;