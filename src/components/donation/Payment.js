// Author: Jay Bhagvanbhai Sonani (B00891984)

import './styles/DonationForm.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
var axios = require('axios');



function Payment() {

    let validCard = false;

    let navigate = useNavigate();

    const { state } = useLocation();
    // const { id, amount, fname, lname, email } = state;

    // console.log(state);

    const [cardNumber, setCardNumber] = useState("");
    const [error, setError] = useState(false);
    const [errorHelperText, setErrorHelperText] = useState("");

    function acceptInput(input) {

        let cardValidator = /^\d+$/;

        if ((input.length < 17 && cardValidator.test(input)) || input === "") {
            setError(false);
            setErrorHelperText("");
            setCardNumber(input);
            validCard = true;
        } else {
            if (input.length < 17) {
                setError(true);
                setErrorHelperText("Only numbers are allowed.");
                validCard = false;
            } else {
                setErrorHelperText("Only 16-digits are allowed.");
            }
        }
        if (input.length === 16 && validCard) {
            validCard = true;
        }
    }

    function storeData(state) {
        var data = JSON.stringify({
            "donation_event_id": state.id,
            "donation_event_name": state.name,
            "donation_amount": state.amount,
            "donor_firstname": state.fname,
            "donor_lastname": state.lname,
            "donor_email": state.email
        });

        var config = {
            method: 'post',
            url: 'https://gracious-givers-backend.herokuapp.com/donation/adddonation',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function makePayment() {
        if (cardNumber.length === 16) {

            storeData(state);

            console.log("from payment page");
            console.log(state);
            navigate("/payment/success");
        } else {
            setError(true);
            setErrorHelperText("Please enter a valid 16-digit card number.");
            alert("Please enter a valid 16-digit card number.");
        }
    }

    return (
        <div>

            <Header />
            <div className="form">
                <br /><br />
                <div className='paymentTitle'>
                    Payment for $ {state.amount}

                </div>
                <br /><br />

                <Form.Control required className={error && "redError"} placeholder={error ? errorHelperText : "Enter card number"} value={cardNumber} type="text" onChange={(e) => acceptInput(e.target.value)} />

                <br /><br />

                <div className="btn">
                    <Button className="paymentButton" style={{ backgroundColor: "#057abe" }} onClick={makePayment} >MAKE PAYMENT</Button>
                </div>
                <br /><br />

            </div >
            <Footer />
        </div>
    );
}

export default Payment;