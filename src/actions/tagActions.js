import axios from 'axios'

import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAILURE,

    TAG_CREATE_REQUEST,
    TAG_CREATE_SUCCESS,
    TAG_CREATE_FAILURE,

    TAG_CREATE_MODAL_OPEN,
    TAG_CREATE_MODAL_CLOSE,

    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_DELETE_FAILURE,

    TAG_DELETE_MODAL_OPEN,
    TAG_DELETE_MODAL_CLOSE
} from '../constants/tagConstants';

import {
    DASHBOARD_SNACKBAR_SUCCESS
} from '../constants/dashboardConstants';

import {
    STUDENT_DETAILS_ADD_TAG,
    STUDENT_DETAILS_REMOVE_TAG
} from '../constants/studentConstants'

export const getTags = () => async (dispatch) => {

    try {
        dispatch({ type: TAG_LIST_REQUEST })
        const { data } = await axios.get("https://drg-hogwarts-react-api.herokuapp.com/api/tags/")

        let tagSet = [...new Set(data)]

        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: tagSet
        })
    } catch (error) {
        dispatch({
            type: TAG_LIST_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const openTagCreateModal = (tagData) => (dispatch) => {
    dispatch({
        type: TAG_CREATE_MODAL_OPEN,
        payload: tagData
    })
}

export const closeTagCreateModal = () => (dispatch) => {
    dispatch({
        type: TAG_CREATE_MODAL_CLOSE
    })
}


export const openTagDeleteModal = (tagData) => (dispatch) => {
    dispatch({
        type: TAG_DELETE_MODAL_OPEN,
        payload: tagData
    })
}

export const closeTagDeleteModal = () => (dispatch) => {
    dispatch({
        type: TAG_DELETE_MODAL_CLOSE
    })
}

export const createStudentTag = (tagData) => async (dispatch) => {
    try {
        dispatch({
            type: TAG_CREATE_REQUEST
        })

        const { data } = await axios.post(
            `https://drg-hogwarts-react-api.herokuapp.com/api/tags/add`,
            {
                tagName: tagData.tagName,
                studentId: tagData.studentId
            }
        )

        dispatch({
            type: TAG_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: STUDENT_DETAILS_ADD_TAG,
            payload: {
                name: data.name,
                id: data.id
            }
        })

        dispatch({
            type: DASHBOARD_SNACKBAR_SUCCESS,
            payload: "Tag successfully created."
        })

    } catch (error) {
        dispatch({
            type: TAG_CREATE_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    } finally {
        dispatch ({
            type: TAG_CREATE_MODAL_CLOSE
        })
    }
}

export const deleteStudentTag = (id) => async (dispatch) => {
    try {
        dispatch({
            type: TAG_DELETE_REQUEST
        })

        const { data } = await axios.delete(
            `https://drg-hogwarts-react-api.herokuapp.com/api/tags/delete/${id}`
        )

        dispatch({
            type: TAG_DELETE_SUCCESS,
            payload: data
        })

        
        dispatch({
            type: STUDENT_DETAILS_REMOVE_TAG,
            payload: id
        })

        dispatch({
            type: DASHBOARD_SNACKBAR_SUCCESS,
            payload: "Tag successfully deleted."
        })

    } catch (error) {
        dispatch({
            type: TAG_DELETE_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    } finally {
        dispatch ({
            type: TAG_DELETE_MODAL_CLOSE
        })
    }
}