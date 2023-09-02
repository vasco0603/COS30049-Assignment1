import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './Wallet.css';
import NodeGraph from './../Component/NodeGraph';
import Person2Icon from '@mui/icons-material/Person2';
import Draweer from './../Component/drawer';
/*Import the resources needed in the d3 Graph*/


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    border: 'none',
    boxShadow: 'none',
    stretch: { height: "100%" },
    color: theme.palette.text.secondary,
}));
/*Declaring the item for the ones that will be used in the grid */

export default function Wallet() {
    return (
        <div class="wallet-page">
            <div class="wallet-page-header">
                <p class="wallet-header-paragraph">Wallet</p>
            </div>
            <div class="wallet-page-details">
                <Draweer />
                 {/* Calling the Drawer SideBar*/}
                <Box sx={{flexGrow: 1}} class="Grid-Box">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={3} md={4} >
                            <Item>
                                <div class="wallet-profile-container">
                                    <br></br><br></br><br></br>
                                    <Person2Icon sx={{ fontSize: 100, fill: 'white' }} /><p class="wallet-id">0x000001</p>
                                </div>
                                {/*Have the Item contain the  profile container which have the logo and the profile ID */}
                            </Item>
                        </Grid>

                        <Grid item xs={12} sm={9} md={8}>
                            <Item>
                                <div class="transaction-table-container">
                                    <div class="table-wrapper">
                                        <table class="transaction-table" style={{ width: '100%' }}>
                                            <tr>
                                                <th>Transaction ID</th>
                                                <th>Value</th>
                                                <th>From</th>
                                                <th>To</th>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>20 ETH</td>
                                                <td>0x000002</td>
                                                <td>0x000001</td>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>10 ETH</td>
                                                <td>0x000003</td>
                                                <td>0x000001</td>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>50 ETH</td>
                                                <td>0x000004</td>
                                                <td>0x000001</td>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>5 ETH</td>
                                                <td>0x000005</td>
                                                <td>0x000001</td>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>8 ETH</td>
                                                <td>0x000006</td>
                                                <td>0x000001</td>
                                            </tr>
                                            <tr>
                                                <td>T1</td>
                                                <td>12 ETH</td>
                                                <td>0x000007</td>
                                                <td>0x000001</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            {/*Table contains incoming transaction */}
                            </Item>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Item>
                                <select name="Transaction-Options" id="Transaction-Options">
                                    <option value="in">Transaction Flow In</option>
                                    <option value="out">Transaction Flow Out</option>
                                </select>
                                {/*Select Option to choose Incoming or Outgoing Transaction */}
                                <div id="chart" class="svg-container">
                                    <NodeGraph />
                                </div>
                                {/*Anchor for the d3 Graph to be shown */}
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
