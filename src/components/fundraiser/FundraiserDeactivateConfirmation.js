// Author: Akanksha Singh (B00892887)

import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

export default function FundrasierDeactivateConfirmation(props) {

    const fundraiser = props.fundraiser;
    const show = props.show;
    const handleHide = props.onHide;
    const handleDeactivate = props.onDeactivate;

    return (

        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                <FaExclamationCircle size={35} 
                                    color={"orange"}
                                    style={{ marginLeft: '7px', marginRight: '15px'}}
                />
                <Modal.Title style={{fontSize:'1.4rem'}}>Confirm deactivation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you should you want to deactivate the fundraiser <em style={{fontWeight:'600'}}>"{fundraiser.title}"</em>&nbsp;?
                <br/><br/>
                Your organization can longer raise funds against this fundraiser after deactivation.
            </Modal.Body>
            <Modal.Footer>
                <Container className='text-center'>
                    <Row>
                        
                        <Col xs={6} md={6}>
                            <Button id="button-cancel" onClick={handleHide} >
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={6} md={6}>
                            <Button id="button-confirm" onClick={() => handleDeactivate(fundraiser)}>
                                Deactivate
                            </Button>   
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}