import React, { Fragment } from 'react'

// Material UI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

// Material UI Icons
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import CakeIcon from '@mui/icons-material/Cake';
import GitHubIcon from '@mui/icons-material/GitHub';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataObjectIcon from '@mui/icons-material/DataObject';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

import SideBarButton from './SideBarButton';
import DarkModeToggle from './DarkModeToggle';

import TestBanner from '../../static/img/background/sidebar-bg.jpg';

function SideBar({ handleDrawerToggle, drawerWidth, mobileOpen, container, darkModeEnabled=false }) {

    const theme = useTheme();

    const drawer = (
        <Fragment>
            <Toolbar />
            <Toolbar />
            <List subheader={<ListSubheader>Faculty Tools</ListSubheader>}>
                <SideBarButton
                    buttonIcon={<DashboardIcon />}
                    menuText="Dashboard"
                    buttonLink="/"
                />
                <SideBarButton
                    buttonIcon={<PersonIcon />}
                    menuText="Student Roster"
                    buttonLink="/students/"
                />
                {/* <SideBarButton
                    buttonIcon={<CakeIcon />}
                    menuText="Birthdays"
                    buttonLink="/birthdays/"
                /> */}
                <SideBarButton
                    buttonIcon={<SchoolIcon />}
                    menuText="Course Catalogue"
                    buttonLink="/courses/"
                />
                {/* <SideBarButton
                    buttonIcon={<EmojiEventsIcon />}
                    menuText="Organizations"
                    buttonLink="/organizations/"
                /> */}
            </List>
            <Toolbar />

            <List subheader={<ListSubheader>App Info</ListSubheader>}>
                <SideBarButton
                    buttonIcon={<InfoIcon />}
                    menuText="About"
                    buttonLink="/about/"
                />
                <SideBarButton
                    buttonIcon={<GitHubIcon />}
                    menuText="See Front-End Code"
                    buttonLink="https://github.com/drewgoodman/HogwartsPortal"
                    outLink={true}
                />
                <SideBarButton
                    buttonIcon={<DataObjectIcon />}
                    menuText="See Restful API Code"
                    buttonLink="https://github.com/drewgoodman/Hogwarts-StudentProfileAPI"
                    outLink={true}
                />
            </List>
            <Toolbar />
            <List subheader={<ListSubheader>Settings</ListSubheader>}>
                <DarkModeToggle />
            </List>
        </Fragment>
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
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundImage: `url(${TestBanner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        '&:before': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            content: '""',
                            display: 'block',
                            background: theme.palette.background.paper,
                            opacity: '0.8'
                        }
                     },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box',
                    width: drawerWidth,
                    backgroundImage: `url(${TestBanner})`,
                    backgroundSize: 'cover',
                    borderRight: `1px solid ${
                        theme.palette.background.paper}`,
                    '&:before': {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        content: '""',
                        display: 'block',
                        background: theme.palette.background.paper,
                        opacity: '0.8'
                    } },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default SideBar
