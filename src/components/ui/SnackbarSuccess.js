import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from '../../actions/dashboardActions';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function SnackbarSuccess() {

    const dispatch = useDispatch();

    const { successSnackbarOpen, successSnackbarMessage } = useSelector(state => state.dashboard)

    const handleClose = () => {
        dispatch(closeSnackbar());
    }

    return (
        <Snackbar
            open={successSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            aria-describedby="dashboard-snackbar"
        >
            <Alert
             onClose={handleClose}
             severity="success"
             >
                {successSnackbarMessage}
            </Alert>
        </Snackbar>
    )
}


export default SnackbarSuccess