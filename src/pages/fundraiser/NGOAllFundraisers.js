// Author: Akanksha Singh (B00892887)

import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import Footer from '../../components/navbar/Footer';
import NGOFundraiserList from "../../components/fundraiser/NGOFundraiserList";
import Header from '../../components/navbar/Header';
import './styles/allFundraisers.css';
import * as FundraiserConstants from "../../components/fundraiser/FundraiserConstants";
import { useParams } from 'react-router-dom';

export default function NGOAllFundraisers() {

    const periodParam = useParams();
    
    const period = FundraiserConstants.period;
    
    const getDefaultPeriod = () => {
        const defaultPeriod = periodParam.period;
        if (Object.values(period).includes(defaultPeriod)) {            
            return defaultPeriod;
        }
        else {
            return period.ongoing;
        }        
    }

    return (
        <>
            <Header />
            <Container className='mb-5 tab-div'>
                <Row>
                    <Col xs={0} md={1}></Col>
                    <Col xs={12} md={10}>
                        <Tabs defaultActiveKey={getDefaultPeriod()} fill>
                            <Tab eventKey="past" title="Past">
                                <NGOFundraiserList period={period.past} />
                            </Tab>
                            <Tab eventKey="ongoing" title="Ongoing">
                                <NGOFundraiserList period={period.ongoing} />
                            </Tab>
                            <Tab eventKey="future" title="Future">
                                <NGOFundraiserList period={period.future} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col xs={0} md={1}></Col>
                </Row>
            </Container>
            <Footer />
        </>
    );

}