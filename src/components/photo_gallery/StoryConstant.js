// Author: Viraj Jigar Shah (B00879448)

import { isAuthenticated } from "../../utils/Network";

export const apiBaseUrl = "https://gracious-givers-backend.herokuapp.com/photoGallery";
//export const apiBaseUrl = "https://gracious-givers-backend.herokuapp.com/photoGallery";

export const getNgoId = () => {
    const ngoUser = isAuthenticated();
    if (ngoUser) {
        return ngoUser._id;
    }
    else {
        return "";
    }
}