import React from "react";
import {FacebookShareButton, FacebookIcon} from "react-share";

export default function ShareOnFacebook (props) {

    const fundraiser = props.event;
    const url = `https://g8-gracious-givers.herokuapp.com/fundraiser/${fundraiser._id}`;

    return (
        <FacebookShareButton 
           url={url}
           quote={fundraiser.title}
           hashtag="#GraciousGivers"
        >
            <FacebookIcon size={40} round={true} />
         </FacebookShareButton>
  );
}