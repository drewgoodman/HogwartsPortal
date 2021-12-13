import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, openSuccessSnackbar } from '../../actions/dashboardActions';

// Material UI Components
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import Brightness4Icon from '@mui/icons-material/Brightness4';

function DarkModeToggle() {

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.dashboard.darkMode)

  const handleToggleDarkMode = () => {
    dispatch(openSuccessSnackbar(
      darkMode ? "Dark mode disabled." : "Dark mode enabled."
    ));
    dispatch(toggleDarkMode());
  }

  return (
    <ListItem>
        <ListItemIcon>
            <Brightness4Icon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-dark-mode" primary="Dark Mode" />
        <Switch
            edge="end"
            checked={darkMode ? true : false}
            inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
            }}
            onClick={handleToggleDarkMode}
        />
    </ListItem>
  )
}

export default DarkModeToggle
