/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
import Card from "./Card";
import NGOList from "./NGOList";
import classes from "./styles/FundraiserRequests.module.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { isAuthenticated, redirectUser } from "../../utils/Network";

const FundraiserRequests = (props) => {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        if (
            isAuthenticated() &&
            JSON.parse(localStorage.getItem("token")).data.isAdmin
        ) {
            if (props.all) {
                fetchAllFundraisers();
            } else {
                fetchPendingFundraisers();
            }
        } else {
            redirectUser("/");
        }
    }, [props.all]);

    async function fetchPendingFundraisers() {
        await Axios.get(
            "https://gracious-givers-backend.herokuapp.com/fundraiser/pending"
        )
            .then((response) => {
                if (response.status === 200) {
                    setFundraisers(response.data);
                    // console.log(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    async function fetchAllFundraisers() {
        await Axios.get(
            "https://gracious-givers-backend.herokuapp.com/fundraiser/cause/All"
        )
            .then((response) => {
                if (response.status === 200) {
                    setFundraisers(response.data);
                    // console.log(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    let list;
    fundraisers &&
        (list = fundraisers.map((event) => {
            return (
                <NGOList
                    type={"event"}
                    id={event._id}
                    name={event.title}
                    key={event._id}
                    description={event.description}
                    ngo={event.createdBy}
                />
            );
        }));
    return (
        <>
            <Header admin={true} />
            <main>
                <section className={classes.event}>
                    {list && (
                        <>
                            {!props.all && <p>Fundraiser Requests</p>}
                            {props.all && <p>Active Fundraisers</p>}
                            <Card>
                                <ul>{list}</ul>
                            </Card>
                        </>
                    )}
                    {!list && props.all && <p>No Active Fundraisers</p>}
                    {!list && !props.all && <p>No New Fundraiser Requests</p>}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default FundraiserRequests;
