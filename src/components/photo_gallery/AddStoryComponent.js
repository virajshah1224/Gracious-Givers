// Author: Viraj Jigar Shah (B00879448)

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ImageElement from './AddStoryElement';

export default function AddImage(props) {

    const Input = styled('input')({
        display: 'none',
    });
    return (
        <div id="container" align="center">
            <Grid sx={{ m: 2, mt: 6 }}>
                <ImageElement />
            </Grid>
        </div>
    )
}
