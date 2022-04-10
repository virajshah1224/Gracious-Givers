// Author: Jay Bhagvanbhai Sonani (B00891984)

import './styles/AllDonations.css';

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DonationCard from "../../components/donation/DonationCard";
import Header from "../../components/navbar/Header";
import { isAuthenticated, redirectUser } from "../../utils/Network";
const axios = require('axios');

const EventsDonations = () => {

    let eventParam = useParams();
    const eventId = eventParam.id;

    const [donations, setDonations] = useState([]);
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        if (!isAuthenticated()) {
            redirectUser("/");
        }
        const retrieveAllDonations = () => {
            var config = {
                method: 'get',
                url: `https://gracious-givers-backend.herokuapp.com/donation/alldonations/${eventId}`,
                headers: {}
            };
            axios(config)
                .then(function (response) {
                    setDonations(response.data.donations);
                    setEventName(response.data.donations[0].donation_event_name);

                    console.log(response.data.donations);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


        retrieveAllDonations();
        console.log("All donations for specific event are retrieved..")
        // console.log(donations);
    }, []);



    return (
        <div>
            <Header />
            <div className="rootDiv">

                <div className="donationTitle">
                    Donations for {eventName}

                </div>

                <div className="allCards" >
                    {
                        donations.map((item, index) => {
                            // console.log(item);
                            return (
                                // <p>Hello</p>
                                <DonationCard key={index.toString()} amount={item.donation_amount} name={item.donor_firstname + ' ' + item.donor_lastname} email={item.donor_email} event_name={""} time={item.createdAt.slice(0, 10)} />
                            )
                        })
                    }






                </div>
            </div>



        </div>

    );
}

export default EventsDonations;