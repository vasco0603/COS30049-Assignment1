import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Axios from 'axios';

const CenteredSearchBar = ({ onSelectedValueChange }) => {
    const [addressIds, setAddressIds] = useState([]);

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

    return (
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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                startAdornment: (
                                    <InputAdornment position="start" button="true">
                                        <SearchIcon sx={{ color: 'white' }} />
                                    </InputAdornment>
                                ),
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
    );
}

export default CenteredSearchBar;
