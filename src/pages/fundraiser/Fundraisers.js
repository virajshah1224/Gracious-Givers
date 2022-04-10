import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import FundraiserDetails from '../../components/fundraiser/FundraiserDetails';
import FundraiserDonation from '../../components/fundraiser/FundraiserDonation';
import ShareOnFacebook from '../../components/socialMediaShare/ShareOnFacebook';
import TopDonors from '../../components/fundraiser/TopDonors';
import { Button } from 'react-bootstrap';
import { BiDonateHeart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as FundraiserConstants from "../../components/fundraiser/FundraiserConstants";
import Axios from "axios";
import './styles/fundraisers.css';
import ShareOnTwitter from "../../components/socialMediaShare/ShareOnTwitter";

export default function FundRaisers() {

    let eventParam = useParams();
    const eventId = eventParam.id;
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [topDonors, setTopDonors] = useState([]);
    const getFundraiserDetailsURI = FundraiserConstants.apiBaseUrl + `/${eventId}`;
    const getTopDonorsURI = `https://gracious-givers-backend.herokuapp.com/donation/topdonors/${eventId}`;

    console.log(getTopDonorsURI);

    useEffect(() => {
        Axios.get(getFundraiserDetailsURI)
            .then((response) => {
                if (response.status === 200) {
                    setEvent(response.data);
                }
            })
            .catch((error) => {
                console.log('Error in getting details of the fundraiser :' + error);
            });


        Axios.get(getTopDonorsURI)
            .then((response) => {
                if (response.status === 200 && response.data.success === true) {
                    setTopDonors(response.data.donations);
                }
            })
            .catch((error) => {
                console.log('Error in getting details of the fundraiser :' + error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-8' style={{ margin: '10px 0px' }}>
                        <FundraiserDetails event={event} />
                    </div>
                    <div className='col-md-4'>
                        <div className='row' style={{ margin: '22px 0px' }}>
                            <div className='col-12'>
                                <div className='support-now'>
                                    <Button variant="primary"
                                        className="custom-btn"
                                        onClick={() => navigate("/donation", { state: { id: event._id, name: event.title, image: event.image } })}>
                                        Donate Now
                                        <BiDonateHeart style={{ marginLeft: '10px', marginBottom: '7px' }} />
                                    </Button>
                                </div>
                                <FundraiserDonation event={event} />
                            </div>
                        </div>
                        <div className='row' style={{ margin: '10px 0' }}>
                            <div className='col-12' id='social-media-share' style={{ paddingBottom: '15px' }}>
                                <div>
                                    <span style={{ fontWeight: 600, paddingRight: '1rem' }}>
                                        <small>Share this fundraiser on</small>
                                    </span>
                                    <ShareOnFacebook event={event} />
                                    <ShareOnTwitter event={event} />
                                </div>
                            </div>
                            <div className='col-12'>
                                <TopDonors donors={topDonors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
