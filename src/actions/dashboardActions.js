import { 
    DASHBOARD_TOGGLE_DARK_MODE,

    DASHBOARD_PIN_STUDENT,
    DASHBOARD_UNPIN_STUDENT,

    DASHBOARD_SNACKBAR_SUCCESS,
    DASHBOARD_SNACKBAR_CLOSE
 } from '../constants/dashboardConstants'

export const toggleDarkMode = () => async (dispatch, getState) => {
    const darkModeState = getState().dashboard.darkMode;
    dispatch({
        type: DASHBOARD_TOGGLE_DARK_MODE,
        payload: !darkModeState
    });

    localStorage.setItem('darkMode', !darkModeState)
}

 export const pinStudent = (id) => async(dispatch, getState) => {
    dispatch({
        type: DASHBOARD_PIN_STUDENT,
        payload: id
    })
    localStorage.setItem('pinnedStudents', JSON.stringify(getState().dashboard.pinnedStudents))
 }
 
 export const unpinStudent = (id) => async(dispatch, getState) => {
    dispatch({
        type: DASHBOARD_UNPIN_STUDENT,
        payload: id
    })
    localStorage.setItem('pinnedStudents', JSON.stringify(getState().dashboard.pinnedStudents))
 }

 export const openSuccessSnackbar = (message) => (dispatch) => {
    dispatch({
        type: DASHBOARD_SNACKBAR_SUCCESS,
        payload: message
    })
 }

 export const closeSnackbar = () => (dispatch) => {
     dispatch({
         type: DASHBOARD_SNACKBAR_CLOSE
     })
 }