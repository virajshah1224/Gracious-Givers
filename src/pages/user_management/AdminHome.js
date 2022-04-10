/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import Card from "../../components/moderation/Card";
import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import NGOList from "../../components/moderation/NGOList";
import classes from "./styles/AdminHome.module.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { isAuthenticated, redirectUser } from "../../utils/Network";

const AdminHome = (props) => {
    const [ngo, setNgo] = useState([]);

    useEffect(() => {
        if (
            isAuthenticated() &&
            JSON.parse(localStorage.getItem("token")).data.isAdmin
        ) {
            if (props.all) {
                fetchAllNgo();
            } else {
                fetchPendingNgo();
            }
        } else {
            redirectUser("/");
        }
    }, [props.all]);

    async function fetchAllNgo() {
        await Axios.get("https://gracious-givers-backend.herokuapp.com/ngo/active")
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data);
                    setNgo(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting ngos:" + error);
            });
    }

    async function fetchPendingNgo() {
        await Axios.get("https://gracious-givers-backend.herokuapp.com/ngo/pending")
            .then((response) => {
                if (response.status === 200) {
                    setNgo(response.data);
                    // console.log(response.data);
                }
            })
            .catch((error) => {
                console.log("Error in getting ngos:" + error);
            });
    }

    let ngoList;

    ngo &&
        (ngoList = ngo.map((ngo) => {
            return (
                <NGOList
                    type={"ngo"}
                    id={ngo._id}
                    name={ngo.ngo_name}
                    key={ngo._id}
                    description={ngo.description}
                />
            );
        }));
    return (
        <>
            <Header admin={true} />
            <main>
                <section className={classes.admin}>
                    {ngoList && (
                        <>
                            {!props.all && <p>NGO SignUp Requests</p>}
                            {props.all && <p>Approved NGO List</p>}
                            <Card>
                                <ul>{ngoList}</ul>
                            </Card>
                        </>
                    )}
                    {!ngoList && props.all && (
                        <p>There are no registered NGOs</p>
                    )}
                    {!ngoList && !props.all && (
                        <p>No new NGO registration requests</p>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AdminHome;
