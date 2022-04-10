// Author: Viraj Jigar Shah (B00879448)

import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import PictureGallery from '../fundraiser/PictureGallery';

function ImageElement() {

    const eventName = localStorage.getItem("eventName")
    const eventID = localStorage.getItem("event_id")
    const cause = localStorage.getItem("cause")

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState("");
    const [desc, setDesc] = useState("");
    const [missingDoc, setMissingDoc] = useState("");
    const [uploadMsg, setUploadMsg] = useState("");
    const handleSubmit = () => {

        if (desc.length == 0 || selectedFile == '') {
            setMissingDoc('Please add content or image')
        }
        else {

            setUploadMsg("Story added")
            const form = new FormData()
            form.append("NGOStory", selectedFile)
            form.append("desc", desc)
            form.append("eventID", eventID)

            axios.post('https://gracious-givers-backend.herokuapp.com/photoGallery/addFundraiserStory', form)//backend
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const onClickHandler = () => {
        navigate(`/ngo/fundraiser/details`);
    };
    const handleChange = (event) => {

        setDesc(event.target.value)
    };

    const handleCapture = (event) => {

        var path = event.target.files[0].name
        setSelectedFile(event.target.files[0])
    };

    return (
        <div align="center">
            <Card sx={{ width: "60%", height: "40%" }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Adding Picture Gallery for Fundraiser
                        </Typography>
                        <TextField
                            id="standard-multiline-static"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: "center" }}>
                    <label htmlFor="contained-button-file">
                        <input accept="image/*" name="image" id="contained-button-file" multiple type="file" onChange={handleCapture} />
                    </label>
                    <Button variant="contained" component="span" onClick={handleSubmit}>
                        Upload
                    </Button>
                </CardActions>
                <CardActions style={{ justifyContent: "center", color: 'red', fontWeight: 'bold' }}>
                    <p><h3>{missingDoc}</h3></p>
                </CardActions>
                <CardActions style={{ justifyContent: "center", color: 'green', fontWeight: 'bold' }}>
                    <p><h4>{uploadMsg}</h4></p>
                </CardActions>
            </Card><br />
            <Button variant="contained" component="span" onClick={onClickHandler}>
                Submit
            </Button><br />
        </div>
    )
}

export default ImageElement