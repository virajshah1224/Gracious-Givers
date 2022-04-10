// Author: Akanksha Singh (B00892887)

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PictureGallery from './PictureGallery';

import './styles/fundraiserDetails.css'

export default class FundraiserDetails extends React.Component {
    render() {
        const event = this.props.event;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 fundraiser-title'>
                        <span>{event.title}</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12' style={{ margin: '10px 0px', textAlign: 'center' }}>
                        <img src={event.image}
                            height="330rem"
                            width="560rem"
                            className="img-fluid fundraiser-image rounded"
                            alt={event.title} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12' >
                        <div className='tab-div'>
                            <Tabs defaultActiveKey="aboutFundraiser"
                                className="mb-3">
                                <Tab eventKey="aboutFundraiser" title="About Fundraiser" className="fundraiser-nav-link">
                                    <p className='tab-content'>{event.description}</p>
                                </Tab>
                                <Tab eventKey="updates" title="Updates">
                                    <PictureGallery event={event} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
