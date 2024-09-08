import React from 'react';
import Grid from '@mui/material/Grid2';
import { Paper } from '@mui/material';

import moto1 from '../assets/moto blue.webp'
import moto2 from '../assets/moto green.webp'
import moto3 from '../assets/moto pink.webp'

import Typography from '@mui/material/Typography';
function Home() {
 return (
  <div>
        <Typography variant="h3" sx={{mb:2}}>
            Stand out in style
        </Typography>

        <Grid container>
            <Grid size={{xs:12 , md:4}} >
                <Paper sx={{ padding: 0, textAlign: 'center' }}>
                   <img src={moto1} alt=""  style={{ width: '100%', height: 'auto' }} /></Paper>
            </Grid>
            <Grid size={{xs:12 , md:4}}>
                <Paper sx={{ padding: 0, textAlign: 'center' }}>
                    <img src={moto2} alt=""  style={{ width: '100%', height: 'auto' }}/></Paper>
            </Grid>
            <Grid size={{xs:12 , md:4}}>
                 <Paper sx={{ padding: 0, textAlign: 'center' }}>
                    <img src={moto3} alt=""  style={{ width: '100%', height: 'auto' }}/> </Paper>
            </Grid>
        </Grid>

  </div>
 );
}

export default Home
