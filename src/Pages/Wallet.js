import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './Wallet.css';
import NodeGraph from './../Component/NodeGraph';
import Person2Icon from '@mui/icons-material/Person2';
import Draweer from './../Component/drawer';
import Axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    border: 'none',
    boxShadow: 'none',
    stretch: { height: '100%' },
    color: theme.palette.text.secondary,
}));

export default function Wallet() {
    const [transactionFlow, setTransactionFlow] = useState('in');
    const [transactions, setTransactions] = useState([]);
    const [transactionsfrom, setTransactionsfrom] = useState([]);

    const handleTransactionFlowChange = (event) => {
        setTransactionFlow(event.target.value);
    };

    useEffect(() => {
        // Fetch data from your source (e.g., Neo4j) and set the transactions state
        if (transactionFlow === 'in') {
            Axios.get('http://127.0.0.1:8000/WalletFrom')
                .then((response) => {
                    const neo4jDatafrom = response.data; // Assuming the response is the array you provided
                    setTransactions(neo4jDatafrom);
                })
                .catch((error) => {
                    console.error('Error fetching data from Neo4j', error);
                });
        } else if (transactionFlow === 'out') {
            Axios.get('http://127.0.0.1:8000/WalletDetails')
                .then((response) => {
                    const neo4jData = response.data; // Assuming the response is the array you provided
                    setTransactions(neo4jData);
                })
                .catch((error) => {
                    console.error('Error fetching data from Neo4j', error);
                });
        }
    }, [transactionFlow]); // Listen for changes in transactionFlow

    return (
        <div className="wallet-page">
            <div className="wallet-page-header">
                <p className="wallet-header-paragraph">Wallet</p>
            </div>
            <div className="wallet-page-details">
                <Draweer />
                <Box sx={{ flexGrow: 1 }} className="Grid-Box">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={3} md={4}>
                            <Item>
                                <div className="wallet-profile-container">
                                    <br />
                                    <br />
                                    <br />
                                    <Person2Icon sx={{ fontSize: 100, fill: 'white' }} />
                                    <p className="wallet-id">0x000001</p>
                                </div>
                            </Item>
                        </Grid>

                        <Grid item xs={12} sm={9} md={8}>
                            <Item>
                                <div id="chart" className="svg-container">
                                    <NodeGraph transactionFlow={transactionFlow} />
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
                                <div className="transaction-table-container">
                                    <div className="table-wrapper">
                                        <table className="transaction-table" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Transaction ID</th>
                                                    <th>From</th>
                                                    <th>Value</th>
                                                    <th>To</th>
                                                    <th>gas used</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactions.map((transactionGroup, index) => (
                                                    transactionGroup.map((transaction, innerIndex) => (
                                                        <tr key={`${index}-${innerIndex}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{transaction._nodes[0].name}</td>
                                                            <td>{transaction._relationships[0].value}</td>
                                                            <td>{transaction._nodes[1].name}</td>
                                                            <td>{transaction._relationships[0].gas_used}</td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
