// Author: Akanksha Singh (B00892887)

import { Card, Table } from 'react-bootstrap';
import { FaDonate } from "react-icons/fa";
import './styles/topDonors.css';
import * as FundraiserConstants from "../../components/fundraiser/FundraiserConstants";


export default function TopDonors(props) {
  

    const topDonors = props.donors.map((donor, index) =>
        <tr key={index}>
            <td align='left'>{donor.donor_firstname + ' ' + donor.donor_lastname}</td>
            <td align='right'> {FundraiserConstants.currencyFormatting(null, donor.donation_amount, 0)}</td>
        </tr>
    );

    return (
        <Card id="top-donors" className='card-custom'>
            <Card.Body className='card-body-color'>
                <Card.Title className='top-donors-title'>
                    Top Donors
                    <div>
                        <FaDonate size='20px' style={{ color: "black" }} />
                    </div>
                </Card.Title>
                <Card.Body>                   
                    <Table responsive>
                        <tbody>
                            {topDonors}
                        </tbody>
                    </Table>                        
                </Card.Body>
            </Card.Body>
        </Card>
    );

}