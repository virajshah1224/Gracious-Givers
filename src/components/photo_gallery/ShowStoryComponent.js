// Author: Viraj Jigar Shah (B00879448)

import * as React from 'react';
import { useState, useEffect } from 'react'
import { Button, Grid, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './style.css';

export default function ShowImage() {

    const [images, setImages] = useState([])
    const [ngoAuth, setNgoAuth] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        // Update the document title using the browser API
        ImageElement();

    }, []);

    function ImageElement() {

        console.log(localStorage.getItem("event_id"))
        console.log(localStorage.getItem("cause"))

        const eventID = localStorage.getItem("event_id")

        axios.get('https://gracious-givers-backend.herokuapp.com/photoGallery/getFundraiserStory', { params: { eventID: eventID } })//backend
            .then(function (response) {

                console.log(response);
                setImages(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onAddClickHandler = () => {
        navigate(`/addImage`);
    };
    const onEditClickHandler = () => {
        navigate(`/editImage`);
    };
    return (
        <>
            <Grid container alignItems={'center'} justifyContent={'center'} spacing={2}>
                <Grid item xs={10}>
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
                <Grid item justify="center">
                    <Button variant="contained" sx={{ align: 'center', color: 'white' }} onClick={onAddClickHandler}>
                        Add Story
                    </Button>
                </Grid>
                <Grid item justify="center">
                    <Button align="center" variant="contained" sx={{ align: 'center', color: 'white' }} onClick={onEditClickHandler}>
                        Edit Story
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}
