/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import Card from "./Card";
import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
import classes from "./styles/NGODetails.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { isAuthenticated, redirectUser } from "../../utils/Network";

const NGODetails = (props) => {
    const [ngo, setNgo] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            isAuthenticated() &&
            JSON.parse(localStorage.getItem("token")).data.isAdmin
        ) {
            if (props.all) {
                fetchActiveNgo(id);
            } else {
                fetchPendingNgo(id);
            }
        } else {
            redirectUser("/");
        }
    }, [id, props.all]);

    async function onApproveHandler() {
        if (window.confirm("Are you sure that you want to Approve?") === true) {
            await Axios.put(
                "https://gracious-givers-backend.herokuapp.com/ngo/" + id + "/status/Active"
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
                "https://gracious-givers-backend.herokuapp.com/ngo/" + id + "/status/Deactivated"
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

    async function fetchActiveNgo(id) {
        await Axios.get("https://gracious-givers-backend.herokuapp.com/ngo/" + id)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data);
                    setNgo(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    async function fetchPendingNgo(id) {
        await Axios.get("https://gracious-givers-backend.herokuapp.com/ngo/" + id)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data);
                    setNgo(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting fundrasiers:" + error);
            });
    }

    return (
        <>
            {ngo && (
                <>
                    <Header admin={true} />
                    <main>
                        <section className={classes.event}>
                            <p>{ngo.ngo_name}</p>
                            <Card>
                                <div className={classes.content}>
                                    {/* <img src={ngo.image} alt="" /> */}
                                    <div>
                                        <h5>Email Address: {ngo.email}</h5>
                                        <h6 className={classes.description}>
                                            {" " + ngo.description}
                                        </h6>
                                        <h6>
                                            User id:
                                            {" " + ngo.user_id}
                                        </h6>
                                        <h6>
                                            Target Group:
                                            {" " + ngo.target_group}
                                        </h6>
                                        {props.all && ngo && (
                                            <h6>
                                                Request Accepted On:
                                                {" " +
                                                    new Date(
                                                        ngo.updatedAt
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

export default NGODetails;
