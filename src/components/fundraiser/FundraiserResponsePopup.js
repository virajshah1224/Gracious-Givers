// Author: Akanksha Singh (B00892887)

import { Modal, Button } from "react-bootstrap";
import "./styles/popupDialog.css";
import { FaCheckCircle } from "react-icons/fa";

export default function FundrasierResponseUp(props) {

    const show = props.show;
    const handleHide = props.onHide;
    const message = props.message;
    const type = props.type;

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Body style={{ margin: '1rem 1rem' }}>
                {
                    type === 'success' &&
                    <FaCheckCircle size={40} 
                                    color={"green"}
                                    style={{ marginLeft: '7px', marginRight: '20px'}}
                    />
                }
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button className="button-close" 
                        style={{width: '6rem'}} 
                        onClick={handleHide} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}