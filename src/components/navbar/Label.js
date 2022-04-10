// Author: Jay Bhagvanbhai Sonani (B00891984)

import { Nav } from 'react-bootstrap';

import './styles/Label.css';

const Label = (props) => {

    const changeRoute = () => {
        window.location.href = props.path;
    }

    return (
        <Nav.Link onClick={changeRoute} >
            {props.title}
        </Nav.Link>
    );
}

export default Label;