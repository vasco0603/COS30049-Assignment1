import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Draweer from './../Component/drawer';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Seaarch from './../Component/searchBar';

const Item = styled(Paper)(({ theme }) => ({ //creates a component "item" using MUI's styled utility
    ...theme.typography.body2,
    padding: theme.spacing(1), //padding for the size of the grids
    textAlign: 'center',      //align the text to center
    color: '#777777',         //color of the text
    boxShadow: 'none',
    backgroundColor: '#362c35'// color of the grid
}));



export default function Home() {
    return (
        <Box                            //used box to change background color of the whole page
            sx={{                         //used to define the style for the box component while in javascript
                display: 'flex',            //helps in ensuring that the color entire page
                minHeight: '100vh',         // ensures the the color covers the entire page
                backgroundColor: '#1b161b', //set the background color
            }}
        >
            <Grid container spacing={1}>  {/* space between the grids \*/}
                {/* Sidebar */}
                <Grid item xs={1}>   {/* alloted space for the grid in the page and the styling is to allow it to stretch downa*/}
                    <Item>
                        <Draweer /> {/*insert side bar object*/}
                    </Item>
                </Grid>

                {/* Main Content */}
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Item sx={{ backgroundColor: 'transparent', color: 'white' }}>Home</Item>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Item sx={{ backgroundColor: 'transparent' }}><CurrencyBitcoinIcon sx={{ color: 'yellow', fontSize: 150 }} /></Item>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Item>
                                <Seaarch />
                            </Item>
                        </Grid>
                        {/* listed items here i guess?*/}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
