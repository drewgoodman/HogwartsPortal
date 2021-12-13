import React, { Fragment, useEffect } from 'react'
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
        <DocumentTitle title="Course Catalogue">
            <Fragment>
                <h1>Courses</h1>
                {courseLoading && <Loader />}
                {
                    courseYearList.map(year => {
                        const yearText = numToNthYear(year)
                        return (
                            <Fragment>
                                <h5>{yearText} Year Classes</h5>
                                {
                                    courses
                                        ?.filter(course => course.recommendedYear === year)
                                        .map(course =>
                                            <Link color="inherit" underline="none" component={RouterLink} to={`/course/${course.id}`}>
                                                <Typography variant="body1" component="div" noWrap={true}>{course.name}</Typography>
                                            </Link>
                                        )
                                }
                            </Fragment>
                        )
                    })
                }

                <Box sx={{ bgcolor: 'background.paper' }}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                    {
                        courseYearList.map(year => {
                        const yearText = numToNthYear(year)

                        return (
                        <Tab label={`${yearText} Year`} />
                        )
                    })
                    }
                    </Tabs>
                </Box>
            </Fragment>

        </DocumentTitle>
    )
}

export default CoursesPage