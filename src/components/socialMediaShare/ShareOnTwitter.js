import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

export default function ShareOnTwitter(props) {
  const fundraiser = props.event;
  const url = `https://g8-gracious-givers.herokuapp.com/fundraiser/${fundraiser._id}`;

  return (
    <TwitterShareButton
      url={url}
      quote={fundraiser.title}
      hashtag="#GraciousGivers"
      style={{ marginLeft: "10px" }}
    >
      <TwitterIcon size={40} round={true} />
    </TwitterShareButton>
  );
}
