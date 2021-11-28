import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { studentListReducer, studentDetailsReducer } from './reducers/studentReducers'
import { dashboardReducer } from './reducers/dashboardReducers'
import { tagsReducer } from './reducers/tagReducers'

const reducer = combineReducers({
    studentList: studentListReducer,
    studentDetails: studentDetailsReducer,
    dashboard: dashboardReducer,
    tags: tagsReducer
})

const pinnedStudentsLocalSetting = localStorage.getItem('pinnedStudents') ?
    JSON.parse(localStorage.getItem('pinnedStudents')): []

const darkModeLocalSetting = localStorage.getItem('darkMode') || false;

const initialState = {
    dashboard: {
        pinnedStudents: pinnedStudentsLocalSetting,
        darkMode: darkModeLocalSetting
    }
}

const middleware = [
    thunk
]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store