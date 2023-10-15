import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CenteredSearchBar = () => {
    // State variables for address IDs, input value, and error
    const [addressIds, setAddressIds] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Get the navigation function

    // Fetch address IDs from a data source (e.g., Neo4j)
    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/allwallet')
            .then((response) => {
                const data = response.data;
                const extractedIds = data.map((item) => item[0].addressId);
                setAddressIds(extractedIds);
            })
            .catch((error) => {
                console.error('Error fetching data from Neo4j', error);
            });
    }, []);

    // Handle key press events, particularly Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setInputValue(e.target.value);
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the input value is in the list of options
        if (addressIds.includes(inputValue)) {
            // Navigate to the Wallet component with the input value as a parameter
            navigate(`/Wallet/${inputValue}`);
        } else {
            setError('Wallet not found');
            console.error('Error: Wallet not found');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Stack spacing={2} sx={{ width: 1000 }}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={addressIds}
                        onInputChange={(e, value) => {
                            setInputValue(value);
                            setError(null); // Clear any previous error
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    startAdornment: (
                                        <InputAdornment position="start" button="true">
                                            <SearchIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={handleSubmit} />
                                        </InputAdornment>
                                    ),
                                    onKeyDown: handleKeyDown,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            </div>
            {error && (
                <div style={{ color: 'red' }}>{error}</div>
            )}
        </form>
    );
}

export default CenteredSearchBar;
