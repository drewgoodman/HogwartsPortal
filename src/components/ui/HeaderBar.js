import React from 'react'

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HeaderBg from '../../static/img/background/header-bg.jpg'

function HeaderBar({ drawerWidth, handleDrawerToggle }) {

    return (
        <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: { xs: 'auto', md: 100},
          ml: { md: `${drawerWidth}px` },
          backgroundImage: `url(${HeaderBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          justifyContent: 'center',
          '&:before': {
              position: 'absolute',
              width: '100%',
              height: '100%',
              content: '""',
              display: 'block',
              background: '#000',
              opacity: '0.7'
          }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" sx={{ display: { xs: 'none', md: 'block' }, fontFamily: "'Cinzel Decorative', cursive" }} >
            Hogwarts Faculty Portal
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default HeaderBar
