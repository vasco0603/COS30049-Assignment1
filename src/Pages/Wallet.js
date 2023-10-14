    import * as React from 'react';
    import { useState } from 'react'; // Import useState from React
    import { styled } from '@mui/material/styles';
    import Box from '@mui/material/Box';
    import Paper from '@mui/material/Paper';
    import Grid from '@mui/material/Grid';
    import './Wallet.css';
    import NodeGraph from './../Component/NodeGraph';
    import Person2Icon from '@mui/icons-material/Person2';
    import Draweer from './../Component/drawer';

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

    export default function Wallet() {
        // State variable to store the selected option
        const [transactionFlow, setTransactionFlow] = useState('in');

        const handleTransactionFlowChange = (event) => {
            setTransactionFlow(event.target.value);
        };

        if (transactionFlow === "in")
        {
            console.log("flow in")
        }
        else if (transactionFlow === "out")
        {
            console.log("flow out")
        }

        return (
            <div className="wallet-page">
                <div className="wallet-page-header">
                    <p className="wallet-header-paragraph">Wallet</p>
                </div>
                <div className="wallet-page-details">
                    <Draweer />
                    {/* Calling the Drawer SideBar */}
                    <Box sx={{ flexGrow: 1 }} className="Grid-Box">
                        <Grid container spacing={2} alignItems="stretch">
                            <Grid item xs={12} sm={3} md={4}>
                                <Item>
                                    <div className="wallet-profile-container">
                                        <br /><br /><br />
                                        <Person2Icon sx={{ fontSize: 100, fill: 'white' }} /><p className="wallet-id">0x000001</p>
                                    </div>
                                    {/* Have the Item contain the profile container which has the logo and the profile ID */}
                                </Item>
                            </Grid>

                            <Grid item xs={12} sm={9} md={8}>
                                <Item>
                                    <div id="chart" className="svg-container">
                                        <NodeGraph transactionFlow={transactionFlow} />
                                        {/* Anchor for the d3 Graph to be shown */}
                                    </div>
                                </Item>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Item>
                                    <select
                                        name="Transaction-Options"
                                        id="Transaction-Options"
                                        value={transactionFlow}
                                        onChange={handleTransactionFlowChange}
                                    >
                                        <option value="in">Transaction Flow In</option>
                                        <option value="out">Transaction Flow Out</option>
                                    </select>
                                    {/* Select Option to choose Incoming or Outgoing Transaction */}
                                    <div className="transaction-table-container">
                                        {/* Content based on the selected option */}
                                        {transactionFlow === "in" ? (
                                            <div className="table-wrapper">
                                                <table className="transaction-table" style={{ width: '100%' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Transaction ID</th>
                                                            <th>Value</th>
                                                            <th>From</th>
                                                            <th>To</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
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
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            // Content for "Transaction Flow Out"
                                            <div className="outgoing-transaction-content">
                                                {/* Add content for "Transaction Flow Out" */}
                                            </div>
                                        )}
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        );
    }
