/*
    Author: Arjun Naravula Loganathan
*/
import Footer from "../components/navbar/Footer";
import Header from "../components/navbar/Header";
import classes from "./styles/AboutUs.module.css";

const AboutUs = () => {
    return (
        <div>
            <Header />
            <br />
            <br />
            <p className={classes.p}>
                <h1>ABOUT US</h1>
            </p>
            <h3 className={classes.h3}>
                Changing Lives for Better Tomorrow
            </h3>
            <br />
            <br />
            <p className={classes.p}>We are a team of volunteers who are passionate about bringing the power of donations to the people who need it most.

                Our team at Gracious Givers is dedicated to helping you. We to bridge the gap between the goodwill and services of NGOs with the generosity of donors.
            </p>

            <p className={classes.p}>
                For NGOs, we offer a platform to list all your events and raise funds for your social cause.

                For donors, we offer a one-stop web application that lists all social welfare fundraising events happening around you and allow you to contribute to a charitable cause.

                Be a part of the change. Lets make a difference.


            </p>
            <br />
            <br />
            <br />

            <Footer />
        </div>
    );
}

export default AboutUs;