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

import studentsData from '../data/students.json';
import studentData from '../data/student.json';

export const listStudents = () => async (dispatch) => {

    // const data = studentsData

    // dispatch({
    //     type: STUDENT_LIST_SUCCESS,
    //     payload: data
    // })

    try {
        dispatch({type: STUDENT_LIST_REQUEST})
        const { data } = await axios.get("https://drg-hogwarts-react-api.herokuapp.com/api/students/")

        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data
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

export const getStudentDetails = (id) => (dispatch) => {
    const data = studentData

    dispatch({
        type: STUDENT_DETAILS_SUCCESS,
        payload: data
    })

}