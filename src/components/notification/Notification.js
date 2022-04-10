import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { isAuthenticated } from "../../utils/Network";
import Header from "../navbar/Header";
import Footer from "../navbar/Footer";
import { Accordion, Badge, Container } from "react-bootstrap";




const Notification = () => {
    const baseURL = "https://gracious-givers-backend.herokuapp.com/notification/";
    // adminNotification";
    const ngoID = isAuthenticated()._id;
    const data = JSON.parse(localStorage.getItem("token"));
    const isNgo = data.data.isNgo
    const notificationURL = isNgo ? baseURL + "ngoNotification" : baseURL + "adminNotification";
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        axios.get(notificationURL).then((response) => {
            if (isNgo) {

                const notificationData = response.data.filter((notification) => {
                    return notification.ngoId === ngoID;
                });
                console.log(notificationData);
                setNotification(notificationData);
            } else {
                setNotification(response.data);
            }

        })
    }, []);

    return (
        <div className="parentDiv">
            {isNgo ? <Header/> : <Header  admin={true}/>}
            <Container>
            <br/>
                <h1>{isNgo ? <Badge bg="secondary">Event Notifications </Badge> : <Badge bg="secondary">Events pending for Approval </Badge>}

                </h1>

                {notification.map((value, index) => {
                    return <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{value.title}</Accordion.Header>
                            <Accordion.Body>
                                {value.description}

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                })}
                <h1>{isNgo ? <Badge bg="secondary">Donations </Badge> : ""}

                </h1>

                
                {isNgo && notification.map((value, index) => {
                    {return value.event_donations.length > 0 ?  <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{value.title}</Accordion.Header>
                            <Accordion.Body>
                            {value.event_donations.length > 0 &&
                            value?.event_donations?.map((value, index) => {
                                return <div>{value.donation_amount} CAD donated by {value.donor_firstname +" "+ value.donor_lastname}</div>
                            })
                        }

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> : ""} 
                })}
            </Container>
            <br/>
            <br/>
            <br/>
            <Footer />

        </div>
    );
}

export default Notification;