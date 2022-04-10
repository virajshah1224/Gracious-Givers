// Author: Jay Bhagvanbhai Sonani (B00891984)

import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import DonationCard from "../../components/donation/DonationCard";
import './styles/AllDonations.css';
import NoEventsFound from "../../components/donation/NoEventsFound";
import { isAuthenticated, redirectUser } from "../../utils/Network";
const axios = require('axios');

function AllDonation() {

    const [donations, setDonations] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const [filteredDonations, setFilteredDonations] = useState(donations);

    useEffect(() => {
        if (!isAuthenticated()) {
            redirectUser("/");
        }
        const retrieveAllDonations = () => {
            var config = {
                method: 'get',
                url: 'https://gracious-givers-backend.herokuapp.com/donation/alldonations',
                headers: {}
            };
            axios(config)
                .then(function (response) {
                    setDonations(response.data.donations);
                    // console.log(response.data.donations);
                    // console.log(donations);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


        retrieveAllDonations();
        console.log("All donations are retrieved..")
        // console.log(donations);
    }, []);



    return (
        <div>
            <Header />
            <div className="rootDiv">

                <div className="donationTitle">
                    Donations made till now

                    {/* <div className='searchParent'> */}
                    <input onChange={(e) => {
                        setSearchKeyword(e.target.value);
                        if (e.target.value === "") {
                            setSearchActive(false);
                        } else {
                            const filtered = donations.filter((item) => {
                                if (item.donation_event_name.toLowerCase().includes(e.target.value.toLowerCase())) {
                                    return item;
                                } else {
                                    return null;
                                }
                            })
                            setFilteredDonations(filtered);
                            setSearchActive(true);
                        }


                    }} value={searchKeyword} type={'text'} className='searchBar' placeholder='Search for an event'></input>
                    {/* </div> */}


                </div>
                <div className="allCards" >

                    {

                        searchActive ?
                            <> {
                                filteredDonations.length === 0 ? <NoEventsFound /> :
                                    filteredDonations.map((item, index) => {
                                        // console.log(item);
                                        return (
                                            // <p>Hello</p>
                                            <DonationCard key={index.toString()} amount={item.donation_amount} name={item.donor_firstname + ' ' + item.donor_lastname} email={item.donor_email} event_name={item.donation_event_name} time={item.createdAt.slice(0, 10)} />
                                        )
                                    })
                            }
                            </>

                            :

                            // <div>
                            <> {
                                donations.map((item, index) => {
                                    // console.log(item);
                                    return (
                                        // <p>Hello</p>
                                        <DonationCard key={index.toString()} amount={item.donation_amount} name={item.donor_firstname + ' ' + item.donor_lastname} email={item.donor_email} event_name={item.donation_event_name} time={item.createdAt.slice(0, 10)} />
                                    )
                                })
                            }
                            </>



                    }



                </div>

            </div>
            <Footer />
        </div >
    );
}

export default AllDonation;