// Author: Viraj Jigar Shah (B00879448)

import * as React from 'react';
import { useState, useEffect } from 'react'
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as StoryContant from "./StoryConstant.js"

export default function ShowImage() {

    const [images, setImages] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        // Update the document title using the browser API
        ImageElement();

    }, []);

    function ImageElement() {

        const ngoAuth = StoryContant.getNgoId();
        const eventID = localStorage.getItem("event_id")

        const setNgoAuth = ngoAuth;

        axios.get('https://gracious-givers-backend.herokuapp.com/photoGallery/getFundraiserStory', { params: { eventID: eventID } })//backend
            .then(function (response) {

                console.log(response);
                setImages(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onClickHandler = () => {
        navigate(`/`);
    };
    return (
        <Grid container alignItems={'center'} justifyContent={'center'}>
            <ul className='uuid'>
                {
                    images.map((item, key) => (
                        <li key={key} className='text-center'>
                            <div >
                                <Grid item>
                                    <img className='imageStyle'
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                    /></Grid>

                            </div>
                            <Grid item>
                                <h3 className='text-center'> {item.description} </h3>
                            </Grid>
                        </li>
                    ))
                }
            </ul>
            {images && images.length === 0 &&
                <p className='text-danger' > <b>No stories added </b> </p>
            }
        </Grid>
    )
}
