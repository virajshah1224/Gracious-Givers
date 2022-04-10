// Author: Jay Bhagvanbhai Sonani (B00891984)
// Author: Akanksha Singh (B00892887)

// Package imports
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import FundRaiser from "./pages/fundraiser/Fundraisers";
import AboutUs from "./pages/AboutUs";
import FundraiserList from "./pages/fundraiser/FundraiserList";
import NGOAllFundraisers from "./pages/fundraiser/NGOAllFundraisers";
import CreatUpdateFundraiser from "./pages/fundraiser/CreateUpdateFundraiser";
import NGOFundraiser from "./pages/fundraiser/NGOFundraiser"
import AdminHome from "./pages/user_management/AdminHome";
import DonationForm from "./components/donation/DonationForm";
import Payment from "./components/donation/Payment";
import PaymentSuccess from "./components/donation/PaymentSuccess";
import NGODetails from "./components/moderation/NGODetails";
import FundraiserRequests from "./components/moderation/FundraiserRequests";
import Login from "./pages/user_management/Login";
import Register from "./pages/user_management/Register";
import AdminLogin from "./pages/user_management/AdminLogin";
import FundraiserRequest from './components/moderation/FundraiserRequest';
import Notification from "./components/notification/Notification";
import AllDonation from "./pages/donation/AllDonations";
import EventsDonations from "./pages/donation/EventsDonations";
import ForgotPassword from "./pages/user_management/ForgotPassword";
import RecoverPassword from "./pages/user_management/RecoverPassword";
import AddStoryPage from "./pages/photo_gallery/AddStoryPage"
import ShowStoryPage from "./pages/photo_gallery/ShowStoryPage"
import EditStoryPage from "./pages/photo_gallery/EditStoryPage"
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* All routes from NavBar */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about_us" element={<AboutUs />} />
          <Route exact path="/contact_us" element={<ContactUs />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/AdminLogin" element={<AdminLogin />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          <Route exact path="/Notification" element={<Notification />} />

          {/* All routes regarding fundraisers */}
          <Route exact path="/fundraiser">
            <Route path=":id" element={<FundRaiser />} />
            <Route index element={<FundraiserList />} />
          </Route>
          <Route exact path="/ngo/fundraiser">
            <Route path=":period" element={<NGOAllFundraisers />} />
            <Route index element={<NGOAllFundraisers />} />
          </Route>
          <Route exact path="/ngo/fundraiser/create" element={<CreatUpdateFundraiser />} />
          <Route exact path="/ngo/fundraiser/update/:id" element={<CreatUpdateFundraiser />} />
          <Route exact path="/ngo/fundraiser/details/:id" element={<NGOFundraiser />} />

          {/* All routes regarding donations */}
          <Route exact path="/donation" element={<DonationForm />} />
          <Route exact path="/all_donations" element={<AllDonation />} />
          <Route exact path="/all_donations/:id" element={<EventsDonations />} />

          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/payment/success" element={<PaymentSuccess />} />

          <Route exact path="/addImage" element={<AddStoryPage />} />
          <Route exact path="/showImage" element={<ShowStoryPage />} />
          <Route exact path="/editImage" element={<EditStoryPage />} />

          {/* All routes regarding moderation */}
          <Route exact path="/admin" element={<AdminHome all={true} />} />
          <Route exact path="/admin/:id" element={<NGODetails all={true} />} />
          <Route exact path="/admin/ngorequests" element={<AdminHome />} />
          <Route exact path="/admin/ngorequests/:id" element={<NGODetails />} />
          <Route exact path="/admin/activefundraisers" element={<FundraiserRequests all={true} />} />
          <Route exact path="/admin/activefundraisers/:id" element={<FundraiserRequest all={true} />} />
          <Route exact path="/admin/fundraiserrequests" element={<FundraiserRequests />} />
          <Route exact path="/admin/fundraiserrequests/:id" element={<FundraiserRequest />} />

          {/* Add pages as needed */}
          <Route exact path="/RecoverPassword/:email" element={<RecoverPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
