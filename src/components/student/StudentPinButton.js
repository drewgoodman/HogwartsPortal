import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinStudent, unpinStudent, openSuccessSnackbar } from '../../actions/dashboardActions';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

function StudentPinButton({ studentId, sx={} }) {

    const dispatch = useDispatch()
    const pinnedStudents = useSelector(state => state.dashboard.pinnedStudents)

    const isPinned = () => {
        return pinnedStudents.includes(studentId) ? true : false
    }

    const handlePinClick = () => {
        if (isPinned()) {
            dispatch(unpinStudent(studentId));
            dispatch(openSuccessSnackbar("Pin removed successfully."));
        } else {
            dispatch(pinStudent(studentId));
            dispatch(openSuccessSnackbar("Student pinned successfully."));
        }
    }

    return (
        <Tooltip
            title={
                isPinned()? "Remove Pin" :
                "Pin to Dashboard"
            }
            sx={sx}
            placement="top-end">
            <IconButton
                onClick={handlePinClick}>
                {
                    isPinned() ?
                    <PushPinIcon />
                    :
                    <PushPinOutlinedIcon />
                }
            </IconButton>
        </Tooltip>
    )
}

export default StudentPinButton
