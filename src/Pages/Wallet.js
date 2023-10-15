import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'; // Corrected import statement
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './Wallet.css'; // Import the CSS file
import NodeGraph from './../Component/NodeGraph'; // Import the NodeGraph component
import Person2Icon from '@mui/icons-material/Person2';
import Drawer from './../Component/drawer'; // Import the Drawer component
import Axios from 'axios'; // Import Axios for making HTTP requests
import { useParams } from 'react-router-dom'; // Import useParams from React Router



// Define a styled Paper component called 'Item'
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
    // Define state variables to manage transaction data
    const [transactionFlow, setTransactionFlow] = useState('in');
    const [transactions, setTransactions] = useState([]);
    const [WalletDetails, setwalletDetails] = useState([]);

    // Handle the change in transaction flow (inbound or outbound)
    const handleTransactionFlowChange = (event) => {
        setTransactionFlow(event.target.value);
    };

    // Get the 'searchValue' from the route parameters using React Router
    const { searchValue } = useParams();

    // Use the 'useEffect' hook to fetch data when 'searchValue' or 'transactionFlow' changes
    useEffect(() => {
        console.log(searchValue);

        // Fetch wallet details from your data source (e.g., Neo4j) based on 'searchValue'
        Axios.get("http://127.0.0.1:8000/personalDetails?addressId=" + searchValue)
            .then((response) => {
                const neo4jDatafrom = response.data;
                setwalletDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data from Neo4j', error);
            });

        // Fetch transaction data based on 'searchValue' and 'transactionFlow'
        if (transactionFlow === 'in') {
            Axios.get("http://127.0.0.1:8000/WalletFrom?addressId=" + searchValue)
                .then((response) => {
                    const neo4jDatafrom = response.data;
                    console.log(response.data);
                    setTransactions(neo4jDatafrom);
                })
                .catch((error) => {
                    console.error('Error fetching data from Neo4j', error);
                });
        } else if (transactionFlow === 'out') {
            Axios.get("http://127.0.0.1:8000/WalletDetails?addressId=" + searchValue)
                .then((response) => {
                    const neo4jData = response.data;
                    console.log(response.data);
                    setTransactions(neo4jData);
                })
                .catch((error) => {
                    console.error('Error fetching data from Neo4j', error);
                });
        }
    }, [searchValue, transactionFlow]); // Listen for changes in 'searchValue' and 'transactionFlow'

    // Render the wallet page UI
    return (
        <div className="wallet-page">
            <div className="wallet-page-header">
                <p className="wallet-header-paragraph">Wallet</p>
            </div>
            <div className="wallet-page-details">
                <Drawer /> {/* Render the Drawer component */}
                <Box sx={{ flexGrow: 1 }} className="Grid-Box">
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={3} md={4}>
                            <Item>
                                <div className="wallet-profile-container">
                                    <br />
                                    <br />
                                    <br />
                                    <Person2Icon sx={{ fontSize: 100, fill: 'white' }} />
                                    {WalletDetails.length > 0 ? (
                                        <div>
                                            <p className="wallet-name">{WalletDetails[0][0].name}</p>
                                            <p className="wallet-id">{WalletDetails[0][0].addressId}</p>
                                        </div>
                                    ) : (
                                        <p className="wallet-name">Loading...</p>
                                    )}
                                </div>
                            </Item>
                        </Grid>

                        <Grid item xs={12} sm={9} md={8}>
                            <Item>
                                <div id="chart" className="svg-container">
                                    <NodeGraph transactionFlow={transactionFlow} transactions={transactions} /> {/* Pass transactions as a prop */}
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
