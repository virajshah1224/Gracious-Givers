// Author: Viraj Jigar Shah (B00879448)

import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import React from "react";
import ShowStoryComponent from "../../components/photo_gallery/ShowStoryComponent";
import ShowStoryUserComponent from "../../components/photo_gallery/ShowStoryUserComponent";
import * as StoryConstant from "../../components/photo_gallery/StoryConstant"

const ShowStoryPage = () => {

    //const ngoAuth = StoryConstant.getNgoId();
    const ngoAuth = "edf";
    // const navigate = useNavigate();
    return (
        <React.Fragment>
            <Header />
            {ngoAuth.length > 0 ? <ShowStoryComponent /> : <ShowStoryUserComponent />}
            <Footer />
            {/* </div> */}
        </React.Fragment >
    );
}

export default ShowStoryPage;