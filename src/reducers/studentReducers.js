import {
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAILURE,

    STUDENT_LIST_NAMES,

    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAILURE,

    STUDENT_DETAILS_ADD_TAG,
    STUDENT_DETAILS_REMOVE_TAG
} from '../constants/studentConstants';

export const studentListReducer = (state = { students: [], studentNames: [] }, action) => {

    switch (action.type) {
        case STUDENT_LIST_REQUEST:
            return { loading: true, students: [], studentNames: [] }

        case STUDENT_LIST_SUCCESS:
            return { ...state, loading: false, students: action.payload }

        case STUDENT_LIST_FAILURE:
            return { loading: false, error: action.payload }

        case STUDENT_LIST_NAMES:
            return { ...state, studentNames: action.payload }

        default:
            return state
    }

}


export const studentDetailsReducer = (state = { student: {} }, action) => {

    switch (action.type) {
        case STUDENT_DETAILS_REQUEST:
            return { loading: true, student: {} }

        case STUDENT_DETAILS_SUCCESS:
            return { loading: false, student: action.payload }

        case STUDENT_DETAILS_FAILURE:
            return { loading: false, error: action.payload }

        case STUDENT_DETAILS_ADD_TAG:
            return {
                ...state,
                student: {
                    ...state.student,
                    tags: [action.payload, ...state.student.tags]
                }
            }

        case STUDENT_DETAILS_REMOVE_TAG:
            return {
                ...state,
                student: {
                    ...state.student,
                    tags: state.student.tags.filter((tag) => { return tag.id !== action.payload })
                }
            }

        default:
            return state
    }

}