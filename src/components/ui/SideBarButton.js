import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

// Material UI components
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function SideBarButton({ buttonIcon, menuText, buttonLink, outLink=false }) {
    return (
        <ListItem
            button
            component={outLink ? "a" : RouterLink}
            to={buttonLink}
            href={buttonLink}
            target={outLink ? "_blank" : ""}
        >
            <ListItemIcon>
                {buttonIcon}
            </ListItemIcon>
            <ListItemText primary={menuText} />
        </ListItem>
    )
}

export default SideBarButton
