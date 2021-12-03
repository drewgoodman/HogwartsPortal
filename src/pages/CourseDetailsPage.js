import React, { useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../actions/courseActions'

import Button from '@mui/material/Button';

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
            <React.Fragment>
                <Button variant="outlined" component={RouterLink} to="/courses/">
                    &#8592; All Courses
                </Button>
                <h1>{course.name}</h1>
            </React.Fragment>
        )
    )
}

export default CourseDetailsPage
