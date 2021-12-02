import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { studentListReducer, studentDetailsReducer } from './reducers/studentReducers'
import { dashboardReducer } from './reducers/dashboardReducers'
import { tagCreateReducer, tagDeleteReducer, tagModalReducer, tagsReducer } from './reducers/tagReducers'
import { courseDetailsReducer, courseListReducer } from './reducers/courseReducers'

const reducer = combineReducers({
    studentList: studentListReducer,
    studentDetails: studentDetailsReducer,
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    dashboard: dashboardReducer,
    tags: tagsReducer,
    tagCreate: tagCreateReducer,
    tagDelete: tagDeleteReducer,
    tagModal: tagModalReducer
})

const pinnedStudentsLocalSetting = localStorage.getItem('pinnedStudents') ?
    JSON.parse(localStorage.getItem('pinnedStudents')): []

const darkModeLocalSetting = localStorage.getItem('darkMode') || true;

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