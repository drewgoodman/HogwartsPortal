import {
    DASHBOARD_TOGGLE_DARK_MODE,
    DASHBOARD_PIN_STUDENT,
    DASHBOARD_UNPIN_STUDENT,
    DASHBOARD_SNACKBAR_SUCCESS,
    DASHBOARD_SNACKBAR_CLOSE
} from "../constants/dashboardConstants";

export const dashboardReducer = (state = {
        pinnedStudents: [],
        darkMode: false,
        successSnackbarOpen: false,
        successSnackbarMessage: ""
    }, action ) => {

    switch (action.type) {

        case DASHBOARD_TOGGLE_DARK_MODE:
            return { ...state, darkMode: action.payload}

        case DASHBOARD_PIN_STUDENT:
            const newStudent = action.payload
            return { ...state, pinnedStudents: [...state.pinnedStudents, newStudent]}
        
        case DASHBOARD_UNPIN_STUDENT:
            return {
                ...state,
                pinnedStudents: state.pinnedStudents.filter(x => x !== action.payload)
            }

        case DASHBOARD_SNACKBAR_SUCCESS:
            return {
                ...state,
                successSnackbarOpen: true,
                successSnackbarMessage: action.payload
            }

        case DASHBOARD_SNACKBAR_CLOSE:
            return {
                ...state,
                successSnackbarOpen: false
            }

        default:
            return state

    }

}