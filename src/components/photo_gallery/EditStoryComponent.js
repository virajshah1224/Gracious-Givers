// Author: Viraj Jigar Shah (B00879448)

import * as React from 'react';
import { useState, useEffect } from 'react'
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { Row, Container, Col } from 'react-bootstrap';
import { Box, textAlign } from '@mui/system';
import { useNavigate } from "react-router-dom";

export default function ShowImage() {

    const [images, setImages] = useState([])
    const [id, setID] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        console.log('in use effect !!')
        editImageElement();
    }, []);

    function handleSubmit(event) {

        var str = String(window.location.href);
        if (str.includes('/editImage')) {
            window.location.reload(true)
        }
        else {
            navigate(`/editImage`);
        }

        console.log('id ============' + event._id)

        const form = new FormData()
        form.append("event", event)

        axios.post('https://gracious-givers-backend.herokuapp.com/photoGallery/deleteFundraiserStory', form) //backend http://localhost:5000/photoGallery/deleteFundraiserStory
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    function editImageElement() {

        const eventID = localStorage.getItem("event_id")
        axios.get('https://gracious-givers-backend.herokuapp.com/photoGallery/getFundraiserStory', { params: { eventID: eventID } }) //backend   http://localhost:5000/photoGallery/getFundraiserStory


            .then(function (response) {
                console.log(response);
                setImages(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Container>
            <Row className='justify-content-center'>
                <h2 className='text-center'> Delete stories from here </h2>
                <Col md={6}>
                    <ul className='uuid'>
                        {
                            images.map((item, key) => (
                                <li key={key} className='text-center'>
                                    <img className='imageStyle'
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <h3 className='text-center'> {item.description} </h3>
                                    <Button variant="contained" component="span" onClick={() => { handleSubmit(item._id) }}> {/*onClick={handleSubmit(item._id)} */}
                                        Delete Story
                                    </Button>
                                    <br /><br />
                                </li>
                            ))
                        }
                    </ul>
                    {images && images.length === 0 &&
                        <p className='text-danger' style={{ textAlign: "center" }}> <h2><b>No stories Updated </b> </h2> </p>
                    }
                </Col>
                <br /><br /><br />
            </Row>
            <br /><br />
        </Container >
    )
}