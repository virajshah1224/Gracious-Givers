/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import { useEffect } from "react";
import Footer from "../components/navbar/Footer";
import Header from "../components/navbar/Header";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Network";
import classes from "./styles/HomePage.module.css";

const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated() && JSON.parse(localStorage.getItem("token")).data.isAdmin) {
            navigate("/admin");
        }
        else if(isAuthenticated() && JSON.parse(localStorage.getItem("token")).data.isNgo) {
            navigate("/ngo/fundraiser");
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <br />
            <p className={classes.p}>
                &ldquo; Trusted by hundreds of NGOs and thousands of Donors &rdquo;
            </p>
            <div className={classes.logo}>
                <svg className={classes.svg} viewBox="0 0 1320 300">
                    <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                        Gracious Givers
                    </text>
                </svg>
            </div>
            {/* cite 10 to 16 and css 1 to 42: https://blog.avada.io/css/text-animations */}
            {/* cite css 54 to 77: https://donorbox.org/  */}
            <br />
            <h3 className={classes.h3}>
                Want to help others in the most efficient and secure way
                possible?
            </h3>
            <p className={classes.p}>
                Sign Up now and Give your donors a seamless donation experience
            </p>
            <br />
            <br />
            <section
                id={classes.performance_you_can_count}
                className={
                    classes["arrow-down-section"] + " " + classes.section
                }
            >
                <h2>Trustworthy &amp; Reliable</h2>
                <p className={classes.p}>We believe in the Art of Giving.</p>
                <ul className={classes.ul}>
                    <li>| Easy to use |</li>
                    <li>| Quick action on Fraud detection |</li>
                    <li>| Fast checkout form |</li>
                    <li>| 99.96% Uptime |</li>
                    <li>| 100% User Satisfaction |</li>
                </ul>
            </section>
            <div>
                <h3 className={classes.h3}>Based on User Testimonials</h3>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    );
};

export default HomePage;
