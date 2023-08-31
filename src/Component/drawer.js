import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function PermanentDrawer() {
    return (
        <Drawer
            variant="permanent" //makes the sidebar always present
            sx={{
                width: 100, //space allocated to the drawer when its opened (kinda useless since our drawer is permanent but just incase)
                flexShrink: 0, //stops the drawer from shrinking if parent container becomes narrower
                '& .MuiDrawer-paper': { //actual styling of the drawer
                    width: 120, //controls drawer content width
                    backgroundColor: '#261e35', // background color
                    borderRight: '1px solid #777777', // Add border on the right
                },
            }}
        >
            <List> {/* these codes are self explanatory*/}
                <ListItem button //makes it a button so click click
                    sx={{
                        display: 'flex', //so we could adjust the position of the icons
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center',
                        paddingLeft: 4, // Center vertically
                        height: 70, // Adjust the height
                    }}>
                    <ListItemIcon>
                        <CurrencyBitcoinIcon sx={{ color: 'yellow', fontSize: 50 }} />
                    </ListItemIcon>
                </ListItem>
                <ListItem button
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center',
                        paddingLeft: 7.3, // Center vertically
                        height: 70, // Adjust the height as
                    }}>
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                </ListItem>
                <ListItem button
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center',
                        paddingLeft: 7.3, // Center vertically
                        height: 70, // Adjust the height as
                    }}>
                    <ListItemIcon>
                        <WalletIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                </ListItem>
                <ListItem button
                    sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center',
                        paddingLeft: 7.3, // Center vertically
                        marginTop: 57,
                        height: 70, // Adjust the height as
                    }}>
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    );
}
