import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Material UI Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';

// Material UI Icons
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CakeIcon from '@mui/icons-material/Cake';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

import SideBarButton from './SideBarButton';
import DarkModeToggle from './DarkModeToggle';

function SideBar({ handleDrawerToggle, drawerWidth, mobileOpen, container }) {

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <SideBarButton
                    buttonIcon={<PersonIcon />}
                    menuText="Students"
                    buttonLink="/students/"
                />
                <SideBarButton
                    buttonIcon={<SchoolIcon />}
                    menuText="Courses"
                    buttonLink="/courses/"
                />
                <SideBarButton
                    buttonIcon={<EmojiEventsIcon />}
                    menuText="Organizations"
                    buttonLink="/organizations/"
                />
                <SideBarButton
                    buttonIcon={<CakeIcon />}
                    menuText="Birthdays"
                    buttonLink="/birthdays/"
                />
            </List>
            <List subheader={<ListSubheader>Account</ListSubheader>}>
                <SideBarButton
                    buttonIcon={<DashboardIcon />}
                    menuText="To Dashboard"
                    buttonLink="/"
                />
                <SideBarButton
                    buttonIcon={<LogoutIcon />}
                    menuText="Logout"
                    buttonLink="/logout/"
                />
                <SideBarButton
                    buttonIcon={<LoginIcon />}
                    menuText="Login"
                    buttonLink="/login/"
                />
                <SideBarButton
                    buttonIcon={<AppRegistrationIcon />}
                    menuText="Create Account"
                    buttonLink="/register/"
                />
            </List>
            <List subheader={<ListSubheader>Settings</ListSubheader>}>
                <DarkModeToggle />
            </List>
        </div>
    );


    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="menu options"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default SideBar
