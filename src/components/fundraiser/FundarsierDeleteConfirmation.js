// Author: Akanksha Singh (B00892887)

import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

export default function FundrasierDeleteConfirmation(props) {

    const fundraiser = props.fundraiser;
    const show = props.show;
    const handleHide = props.onHide;
    const handleDelete = props.onDelete;

    return (

        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                <FaExclamationCircle size={35} 
                                    color={"orange"}
                                    style={{ marginLeft: '7px', marginRight: '15px'}}
                />
                <Modal.Title style={{fontSize:'1.4rem'}}>Confirm delete</Modal.Title>              
            </Modal.Header>
            <Modal.Body>                
                Clicking <em style={{fontWeight:'600'}}>“Delete”</em> will permanently delete your fundraiser <em style={{fontWeight:'600'}}>"{fundraiser.title}"</em>.
                <br/><br/>
                Are you should you want to proceed?
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
                        <Button id="button-confirm" onClick={() => handleDelete(fundraiser)}>
                            Delete
                        </Button>   
                    </Col>
                </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}