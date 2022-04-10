/*
    Author: Jay Nimeshkumar Patel (B00885078)
*/
import classes from "./styles/Card.module.css";

const Card = (props) => {
    const className = `${classes.card} ${props.className}`;
    return <div className={className}>{props.children}</div>;
};

export default Card;
