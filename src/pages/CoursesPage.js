import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listCourses } from '../actions/courseActions';
import { numToNthYear } from '../utils.js/studentUtils';

import Loader from '../components/ui/Loader';

function CoursesPage() {

    const dispatch = useDispatch();

    const courseList = useSelector(state => state.courseList);
    const { courses, loading: courseLoading } = courseList;

    const courseYearList = Array.from({ length: 7 }, (_, i) => i + 1)

    useEffect(() => {
        dispatch(listCourses())
    }, [dispatch])

    return (
        <div>
            <h1>Courses</h1>
            {courseLoading && <Loader />}
            {
                courseYearList.map(year => {
                    const yearText = numToNthYear(year)
                    return (
                        <div>
                            <h5>{yearText} Year Classes</h5>
                            {
                                courses
                                    ?.filter(course => course.recommendedYear === year)
                                    .map(course =>
                                        <div>{course.name}</div>
                                    )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CoursesPage