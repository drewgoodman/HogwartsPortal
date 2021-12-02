import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../actions/courseActions'

import Loader from '../components/ui/Loader';

function CourseDetailsPage() {


    const match = useParams();
    const dispatch = useDispatch();


    const courseDetails = useSelector(state => state.courseDetails);
    const { loading, course } = courseDetails

    useEffect(() => {
        dispatch(getCourseDetails(match.id));
    }, [dispatch, match])

    return (
        loading ? <Loader /> : (
            <h1>{course.name}</h1>
        )
    )
}

export default CourseDetailsPage
