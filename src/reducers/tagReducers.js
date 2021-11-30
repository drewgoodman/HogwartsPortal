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

export const tagsReducer = (state = { tagsList: [] }, action) => {

    switch (action.type) {
        case TAG_LIST_REQUEST:
            return { loading: true, tagsList: [] }

        case TAG_LIST_SUCCESS:
            return { loading: false, tagsList: action.payload }

        case TAG_LIST_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }

}

export const tagModalReducer = (state = {
    tagCreateModalOpen: false,
    tagDeleteModalOpen: false,
    tagData: {}
}, action) => {

    switch (action.type) {
        case TAG_CREATE_MODAL_OPEN:
            return {
                ...state,
                tagCreateModalOpen: true,
                tagData: action.payload
            }

        case TAG_CREATE_MODAL_CLOSE:
            return {
                ...state,
                tagCreateModalOpen: false,
                tagData: {}
            }

        case TAG_DELETE_MODAL_OPEN:
            return {
                ...state,
                tagDeleteModalOpen: true,
                tagData: action.payload
            }

        case TAG_DELETE_MODAL_CLOSE:
            return {
                ...state,
                tagDeleteModalOpen: false,
                tagData: {}
            }

        default:
            return state
    }

}

export const tagCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case TAG_CREATE_REQUEST:
            return { loading: true }

        case TAG_CREATE_SUCCESS:
            return { loading: false, tag: action.payload }

        case TAG_CREATE_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const tagDeleteReducer = (state = {}, action) => {

    switch (action.type) {
        case TAG_DELETE_REQUEST:
            return { loading: true }

        case TAG_DELETE_SUCCESS:
            return { loading: false, success: true }

        case TAG_DELETE_FAILURE:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}