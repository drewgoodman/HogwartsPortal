import axios from 'axios'

import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAILURE
} from '../constants/tagConstants';

export const getTags = () => async (dispatch) => {

    try {
        dispatch({type: TAG_LIST_REQUEST})
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