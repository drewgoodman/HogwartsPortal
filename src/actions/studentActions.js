import axios from 'axios'

import {
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAILURE,
    
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAILURE,
    STUDENT_LIST_NAMES,
} from '../constants/studentConstants';

export const listStudents = () => async (dispatch) => {

    try {
        dispatch({type: STUDENT_LIST_REQUEST})
        const { data } = await axios.get("https://drg-hogwarts-react-api.herokuapp.com/api/students/")

        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data
        })

        const studentNames = data.map(student => `${student.firstName} ${student.lastName}`)

        dispatch({
            type: STUDENT_LIST_NAMES,
            payload: studentNames
        })

    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getStudentDetails = (id) => async (dispatch) => {

    try {
        dispatch({type: STUDENT_DETAILS_REQUEST})
        const { data } = await axios.get(`https://drg-hogwarts-react-api.herokuapp.com/api/students/${id}`)

        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STUDENT_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }

}