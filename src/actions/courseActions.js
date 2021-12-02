import axios from 'axios'

import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAILURE,

    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAILURE
} from '../constants/courseConstants';

export const listCourses = () => async (dispatch) => {

    try {
        dispatch({type: COURSE_LIST_REQUEST})
        const { data } = await axios.get("https://drg-hogwarts-react-api.herokuapp.com/api/courses/")

        dispatch({
            type: COURSE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getCourseDetails = (id) => async (dispatch) => {

    try {
        dispatch({type: COURSE_DETAILS_REQUEST})
        const { data } = await axios.get(`https://drg-hogwarts-react-api.herokuapp.com/api/courses/${id}`)

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }

}
