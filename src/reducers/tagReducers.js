import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAILURE
} from '../constants/tagConstants';

export const tagsReducer = (state = { tagsList: [] }, action ) => {

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