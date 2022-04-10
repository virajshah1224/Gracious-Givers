// Author: Jay Bhagvanbhai Sonani (B00891984)

import Footer from "../navbar/Footer";
import Header from "../navbar/Header";
import './styles/PaymentSuccess.css';

function PaymentSuccess() {

    return (
        <div>
            <Header />
            <div className="form">
                <br /><br />
                <div className='title'>
                    Donation Successful
                </div>
                <br /><br />

                <img src={require("../../assets/check-mark.png")} height={128} width={128} alt=""></img>
                <br /><br />
                <div className='text'>
                    Thank you!
                </div>

                <br />
                <br /><br />
            </div >
            <Footer />
        </div>
    );
}

export default PaymentSuccess;