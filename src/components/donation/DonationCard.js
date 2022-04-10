// Author: Jay Bhagvanbhai Sonani (B00891984)

import './styles/DonationCard.css';

const DonationCard = (props) => {
    return (
        <div className='donationCard'>
            <div className='donationAmount'>
                {`Amount $${props.amount}`}
            </div>
            <div className='donationContent'>
                By {props.name}
                <br />
                Email: {props.email}
                <br />
                <br />

                {/* <div className='donationContent'> */}
                Donated on: {props.time}
                <br />
                {props.event_name}
                <br />
                {/* </div> */}

            </div>
        </div>
    );
}

export default DonationCard;