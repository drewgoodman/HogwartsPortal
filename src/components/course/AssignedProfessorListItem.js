import React from 'react'

import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

function AssignedProfessorListItem({ professorDetails, hideUnassigned = false }) {

    const { firstName, lastName, image} = professorDetails

    return professorDetails ? (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={`${firstName} ${lastName}`} src={image} />
            </ListItemAvatar>
            <ListItemText primary={`${firstName} ${lastName}`} secondary="Assigned Professor" />
        </ListItem>
    ) : hideUnassigned ? (
        null
    ) : (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt="Unassigned" sx={{ bgcolor: "gray" }}>??</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Professor Unknown" secondary="None assigned" />
        </ListItem>
    )
}

export default AssignedProfessorListItem
