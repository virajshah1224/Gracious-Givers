// Author: Akanksha Singh (B00892887)

import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import FundraiserCard from '../../components/fundraiser/FundraiserCard';
import Header from "../../components/navbar/Header";
import Footer from "../../components/navbar/Footer";
import * as FundrasierConstants from "../../components/fundraiser/FundraiserConstants";
import "./styles/fundraiserList.css";

export default function FundraiserList() {

    const defaultCause = 'All';
    const causes = FundrasierConstants.causes;
    const [cause, setCause] = useState(defaultCause);
    const [fundraisers, setFundraisers] = useState([]);
    const navigate = useNavigate();

    // render new fundrasiers whenever the selected cause changes 
    useEffect(() => {
        fetchFundraisers(defaultCause)
    }, []);

    async function fetchFundraisers(selectedCause) {

        const getFundraisersByCauseUrl = FundrasierConstants.apiBaseUrl + `/cause/${selectedCause}`;
        await Axios.get(getFundraisersByCauseUrl)
            .then(response => {
                if (response.status === 200) {
                    setFundraisers(response.data);
                }
            })
            .catch(error => {
                console.log('Error in getting fundrasiers:' + error);
            });
    }

    const handleCauseSelect = (event) => {
        const selectedCause = event;
        setCause(selectedCause);
        fetchFundraisers(selectedCause);
    }

    const onCardClickHandler = (id) => {
        navigate(`/fundraiser/${id}`);
    };

    return (
        <>
            <Header />
            <Container className='mb-5'>
                <Row className='mb-5' style={{ margin: '0.5rem 0' }}>
                    <Col xs={0} md={1} />
                    <Col xs={12} md={10}>
                        <Row style={{ margin: '0.5rem 0' }}>
                            <Col>
                                <span style={{ textAlign: 'right', fontWeight:'600'}}>
                                    Search By Cause
                                </span>
                            </Col>
                            <Col xs={7} md={10}>
                                <DropdownButton id="causes-dropdown"
                                    title={cause}
                                    onSelect={handleCauseSelect}>
                                    {causes.map(cause =>
                                        <Dropdown.Item key={cause} eventKey={cause}>
                                            {cause}
                                        </Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row>                           
                            {fundraisers.map(fundraiser =>
                                <Col key={fundraiser._id} xs={12} md={4}
                                    style={{ margin: '0.6rem 0' }} >
                                    <FundraiserCard details={fundraiser}
                                        onCardClick={() => onCardClickHandler(fundraiser._id)}
                                    />
                                </Col>
                            )}                                                                   
                        </Row>
                    </Col>
                    <Col xs={0} md={1} />
                </Row>
            </Container>
            <Footer />
        </>
    );

}