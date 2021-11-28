import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

// Material UI components
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function SideBarButton({ buttonIcon, menuText, buttonLink }) {
    return (
        <ListItem
            button
            component={RouterLink}
            to={buttonLink}
        >
            <ListItemIcon>
                {buttonIcon}
            </ListItemIcon>
            <ListItemText primary={menuText} />
        </ListItem>
    )
}

export default SideBarButton
