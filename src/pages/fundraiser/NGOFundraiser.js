// Author: Akanksha Singh (B00892887)

import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import FundraiserDetails from '../../components/fundraiser/FundraiserDetails';
import FundraiserDonation from '../../components/fundraiser/FundraiserDonation';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareOnFacebook from '../../components/socialMediaShare/ShareOnFacebook';
import * as FundraiserConstants from "../../components/fundraiser/FundraiserConstants";
import Axios from "axios";
import './styles/fundraisers.css';
import FundraiserStatus from "../../components/fundraiser/FundraiserStatus";
import { Col, Container, Row } from "react-bootstrap";
import ShareOnTwitter from "../../components/socialMediaShare/ShareOnTwitter";

export default function NGOFundraiser() {

    let eventParam = useParams();
    const eventId = eventParam.id;      
    const [event, setEvent] = useState({});      
    const getFundraiserDetailsURI = FundraiserConstants.apiBaseUrl + `/${eventId}`;
    
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
               
    }, []);

    return (
        <>
            <Header />
                <Container className='mb-5 tab-div'>    
                    <Row>
                        <Col xs={0} md={1}></Col>
                        <Col xs={0} md={10}>
                            <Row>
                                <Col xs={12} md={8}>
                                    <FundraiserDetails event={event} />
                                </Col>
                                <Col xs={12} md={4}>
                                    <Row style = {{marginTop:'40px', marginBottom:'15px'}}>
                                        <Col style={{textAlign:'center'}}>
                                            <FundraiserStatus statusValue={event.status} /> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={12}>
                                        {   
                                            event.status !== 'Pending Admin Approval' &&
                                            <FundraiserDonation event={event} isNgo="true" />
                                        }
                                        </Col>
                                        <Col xs={12} md={12} style={{margin: '1.5rem 0'}}>
                                        {   
                                            event.status === 'Active' &&
                                            <div className='col-12' id='social-media-share' style={{paddingBottom:'15px'}}>
                                                <div>
                                                    <span style={{ fontWeight: 600, paddingRight: '1rem' }}>
                                                        <small>Share this fundraiser on</small>
                                                    </span>
                                                    <ShareOnFacebook event={event} /> 
                                                    <ShareOnTwitter event={event} />                               
                                                </div>
                                            </div>                                     
                                        }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={0} md={1}></Col>
                    </Row>
                </Container>        
            <Footer />
        </>
    );
}
