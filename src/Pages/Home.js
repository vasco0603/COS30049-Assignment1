import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Draweer from './../Component/drawer';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Seaarch from './../Component/searchBar';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#777777',
    boxShadow: 'none',
    backgroundColor: '#362c35',
}));

export default function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#261e35',
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <Item>
                        <Draweer />
                    </Item>
                </Grid>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Item sx={{ backgroundColor: 'transparent', color: 'white' }}>Home</Item>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Item sx={{ backgroundColor: 'transparent' }}><CurrencyBitcoinIcon sx={{ color: 'yellow', fontSize: 150 }} /></Item>
                        </Grid>
                        <Grid item xs={8} sm={10} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Item>
                                <Seaarch/>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
