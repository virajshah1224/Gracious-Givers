/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import Card from "./Card";
import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import classes from "./styles/FundraiserRequest.module.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, redirectUser } from "../../utils/Network";

const FundraiserRequest = (props) => {
    const [fundraiser, setFundraiser] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            isAuthenticated() &&
            JSON.parse(localStorage.getItem("token")).data.isAdmin
        ) {
            if (props.all) {
                fetchAllFundraiser(id);
            } else {
                fetchPendingFundraiser(id);
            }
        } else {
            redirectUser("/");
        }
    }, [id, props.all]);

    async function onApproveHandler() {
        if (window.confirm("Are you sure that you want to Approve?") === true) {
            await Axios.put(
                "https://gracious-givers-backend.herokuapp.com/fundraiser/" +
                    id +
                    "/status/Active"
            )
                .then((response) => {
                    if (response.status === 200) {
                        window.alert("Request Approved!");
                        navigate(-1);
                    }
                })
                .catch((error) => {
                    console.log("Error while Approving" + error);
                });
        } else {
            window.alert("Action aborted!");
        }
    }

    async function onRejectHandler() {
        const type = props.all ? "Deactivate" : "Reject";
        if (
            window.confirm("Are you sure that you want to " + type + "?") ===
            true
        ) {
            await Axios.put(
                "https://gracious-givers-backend.herokuapp.com/fundraiser/" +
                    id +
                    "/status/Deactivated"
            )
                .then((response) => {
                    if (response.status === 200) {
                        window.alert(type + "ed!");
                        navigate(-1);
                    }
                })
                .catch((error) => {
                    console.log("Error while " + type + "ing." + error);
                });
        } else {
            window.alert("Action aborted!");
        }
    }

    async function fetchPendingFundraiser(id) {
        await Axios.get(
            "https://gracious-givers-backend.herokuapp.com/fundraiser/" + id
        )
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data);
                    setFundraiser(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    async function fetchAllFundraiser(id) {
        await Axios.get(
            "https://gracious-givers-backend.herokuapp.com/fundraiser/" + id
        )
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data);
                    setFundraiser(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    return (
        <>
            {fundraiser && (
                <>
                    <Header admin={true} />
                    <main>
                        <section className={classes.event}>
                            <p>{fundraiser.title}</p>
                            <Card>
                                <div className={classes.content}>
                                    <img src={fundraiser.image} alt="" />
                                    <div>
                                        <h5>NGO: {fundraiser.createdBy}</h5>
                                        <h6 className={classes.description}>
                                            {" " + fundraiser.description}
                                        </h6>
                                        <h6>
                                            Cause:
                                            {" " + fundraiser.cause}
                                        </h6>
                                        {!props.all && (
                                            <h6>
                                                Requested Active days:
                                                {" " + fundraiser.activeDays}
                                            </h6>
                                        )}
                                        <h5>
                                            Goal Amount: {fundraiser.currency}{" "}
                                            {fundraiser.goalAmount}
                                        </h5>
                                        {props.all && (
                                            <h6>
                                                Amount Raised:
                                                {" CAD " +
                                                    fundraiser.amountRaised}
                                            </h6>
                                        )}
                                        {props.all && (
                                            <h6>
                                                Total Donors:
                                                {" " + fundraiser.donors}
                                            </h6>
                                        )}
                                        {props.all && fundraiser && (
                                            <h6>
                                                End Date:
                                                {" " +
                                                    new Date(
                                                        fundraiser.endDate
                                                    ).toDateString()}
                                            </h6>
                                        )}
                                    </div>
                                </div>
                                {!props.all && (
                                    <>
                                        <button onClick={onApproveHandler}>
                                            Approve
                                        </button>
                                        <button
                                            className={
                                                classes[
                                                    "custom-logout-btn-header"
                                                ]
                                            }
                                            onClick={onRejectHandler}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {props.all && (
                                    <>
                                        <button
                                            className={
                                                classes[
                                                    "custom-logout-btn-header"
                                                ]
                                            }
                                            onClick={onRejectHandler}
                                        >
                                            Deactivate
                                        </button>
                                    </>
                                )}
                            </Card>
                        </section>
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
};

export default FundraiserRequest;
