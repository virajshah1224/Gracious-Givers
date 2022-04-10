// Author: Viraj Jigar Shah (B00879448)

import ShowStoryComponent from "../../components/photo_gallery/ShowStoryComponent";
import ShowStoryUserComponent from "../../components/photo_gallery/ShowStoryUserComponent";
import * as StoryConstant from "../photo_gallery/StoryConstant"

export default function PictureGallery(props) {

    const event = props.event;
    const id = event._id;
    const cause = event.cause;

    localStorage.setItem("event_id", id)
    localStorage.setItem("cause", cause)

    const ln = localStorage.getItem("event_id")
    const ca = localStorage.getItem("cause")

    console.log(ln)
    console.log(ca)

    const ngoAuth = StoryConstant.getNgoId();
    console.log(event)

    return (
        <>
            {id != undefined ? ngoAuth === '' ? <ShowStoryUserComponent event={event} /> : <ShowStoryComponent event={event} /> : <></>}
        </>
    );
}