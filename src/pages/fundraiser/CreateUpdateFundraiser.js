// Author: Akanksha Singh (B00892887)

import Footer from "../../components/navbar/Footer";
import Header from "../../components/navbar/Header";
import CreateEditFundraiserForm from "../../components/fundraiser/CreateEditFundraiserForm";
import * as FundraiserConstants from "../../components/fundraiser/FundraiserConstants";
import { useParams, useNavigate } from "react-router-dom";

export default function CreatUpdateFundraiser() {

    const navigate = useNavigate();
    let param = useParams();
    const paramEventId = param.id;

    let action;
    if (!paramEventId) {
        action = 'create';
    }
    else {
        action = 'update';
    }

    const onCreateSuccess = (fundraiserId) => {
        navigate("/ngo/fundraiser/future");
    }

    const onUpdateSuccess = (fundraiser) => {
        const status = FundraiserConstants.fundraiserStatus;
        if (!fundraiser) {
            navigate("/ngo/fundraiser");
        }
        else if (fundraiser.status === status.active)
        {
            navigate("/ngo/fundraiser/ongoing");
        }
        else if (fundraiser.status === status.pendingApproval) 
        {
            navigate("/ngo/fundraiser/future");
        }
        else 
        {
            navigate("/ngo/fundraiser");
        }        
    }

    return (
        <>
            <Header />
            <CreateEditFundraiserForm action={action}
                fundraiserId={paramEventId}
                onCreateSuccess={onCreateSuccess}
                onUpdateSuccess={onUpdateSuccess} />
            <Footer />
        </>
    );

}
