import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const CenteredSearchBar = () => {
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
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                startAdornment: (
                                    <InputAdornment position="start" button>
                                        <SearchIcon sx={{ color: 'white' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'white', // Change the border color to white
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

const top100Films = [
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f' },
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f450' },
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f451' },
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f452' },
    { title: "0x742d35Cc6634C0532925a3b844Bc454e4438f453" },
    { title: '0x742d35Cc6634C0532925a3b844Bc454e4438f454' },
];

export default CenteredSearchBar;
