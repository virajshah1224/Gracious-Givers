// Author: Akanksha Singh (B00892887)

import { isAuthenticated, redirectUser } from "../../utils/Network";

export const period = {
    past: "past",
    ongoing: "ongoing",
    future: "future"
}

export const fundraiserStatus = {
    draft: 'Draft',
    active: 'Active',
    deactivated: 'Deactivated',
    completed: 'Completed',
    pendingApproval: 'Pending Admin Approval'
}

export const causes = [
    'All',
    'Education',
    'Environment',
    'Animal Welfare',
];

// export const apiBaseUrl = "http://localhost:5000/fundraiser"; 
export const apiBaseUrl = "https://gracious-givers-backend.herokuapp.com/fundraiser";

export const defaultCurrency = "CAD";

export const fundraiserMaxActiveDays = 180;

export const allowedImageType = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
]

export const getNgoId = () => {
    const ngoUser = isAuthenticated();
    if (ngoUser) {
        return ngoUser._id;
    }
    else {
        redirectUser("/");
    }
}

export const maxGoalAmountFormatted = "1,000,000";
export const maxGoalAmount = 1000000;

export const currencyFormatting = (currency, amount, minimumFractionDigits) => {
    currency = !currency ? defaultCurrency : currency;
    amount = !amount ? 0 : amount;
    return new Intl.NumberFormat(`en-US`, {
        currency: currency,
        style: 'currency',
        minimumFractionDigits: minimumFractionDigits
    }).format(amount);
}