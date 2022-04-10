// Author: Akanksha Singh (B00892887)

import { Card, ProgressBar } from "react-bootstrap";
import './styles/fundraiserDonation.css';
import * as FundraiserConstants from './FundraiserConstants';

export default function FundraiserDonation(props) {

    const event = props.event;
    const progress = ((props.event.amountRaised) / (props.event.goalAmount)) * 100;
    const isNgo = props.isNgo;

    const getDaysRemaining = () => {
        let endDate = new Date(event.endDate);
        let timeDifference = endDate.getTime() - new Date().getTime();
        let daysRemaining = Math.round(timeDifference / (1000 * 60 * 60 * 24));
        return !daysRemaining ? 0 : daysRemaining;
    }

    const formatDate = (dateString) => {
        const targetDate = new Date(dateString);
        const months = ["January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"];
        const formattedDate = months[targetDate.getMonth()]
            + " " + targetDate.getDate()
            + ", " + targetDate.getFullYear();
        return formattedDate;
    }

    return (
        <Card className='card-custom' id='fundraiser-donation-details'>
            <Card.Body className='card-body-color'>
                {!isNgo &&
                    <div id='createdDetails'>
                        <span style={{ fontWeight: 600 }}>
                            <small>Created By</small>
                        </span>
                        <br />
                        <span>{event.createdBy}</span>
                    </div>
                }

                <div id='donationDetails'>
                    <span style={{ fontWeight: 600 }}>
                        <small>Raised</small><br />
                        <span style={{ fontSize: '25px', fontWeight: '600', color: 'rgb(3, 106, 166, 1)' }}>
                            {FundraiserConstants.currencyFormatting(event.currency, event.amountRaised, 0)}
                        </span>
                        &nbsp;of&nbsp;{FundraiserConstants.currencyFormatting(event.currency, event.goalAmount, 0)}
                        <ProgressBar now={progress}
                            className="blue-progress-bar"
                            style={{ borderRadius: '19.5px', background: 'rgb(170 207 232)', height: '20px', margin: '8px 0' }} />
                    </span>
                    <div id='supporters-days-remaining'>
                        <span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{event.donors}
                            </span>&nbsp;
                            donations
                        </span>
                        <br />
                        {(!isNgo && event.status === FundraiserConstants.fundraiserStatus.deactivated)
                            || !isNgo
                            &&
                            <span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                                    {getDaysRemaining()}
                                </span>
                                &nbsp;days remaining
                            </span>
                        }
                        {
                            isNgo && (event.status === FundraiserConstants.fundraiserStatus.deactivated
                                || event.status === FundraiserConstants.fundraiserStatus.deactivated) &&
                            <div style={{ marginTop: '0.8rem' }}>
                                <span style={{ fontWeight: 600 }}>Ended On </span>
                                &nbsp;{formatDate(event.endDate)}
                            </div>
                        }
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}