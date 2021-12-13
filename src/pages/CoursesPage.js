import React, { Fragment, useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { listCourses } from '../actions/courseActions';
import { numToNthYear } from '../utils/studentUtils';

import CourseCard from '../components/course/CourseCard';
import Loader from '../components/ui/Loader';

function CoursesPage() {

    const dispatch = useDispatch();

    const courseList = useSelector(state => state.courseList);
    const { courses, loading: courseLoading } = courseList;

    const courseYearList = Array.from({ length: 7 }, (_, i) => i + 1)

    const [yearValue, setYearValue] = useState(1)

    const handleYearSelect = (e, newValue) => {
        setYearValue(newValue)
    }

    useEffect(() => {
        dispatch(listCourses())
    }, [dispatch])

    return (
        <DocumentTitle title="Course Catalogue">
            <Fragment>
                <h1>Course Catalogue</h1>
                <Container maxWidth="lg">
                <Grid container maxWidth="lg" spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ bgcolor: 'background.paper' }}>
                            <Tabs
                                value={yearValue}
                                onChange={handleYearSelect}
                                orientation="vertical"
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
                                            <Tab key={`course-year-tab-${year}`} label={`${yearText} Year`} value={year} sx={{justifyContent: "right"}} />
                                        )
                                    })
                                }
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                {courseLoading && <Loader />}
                        {
                            courseYearList.map(year => {
                                const yearText = numToNthYear(year)
                                return (
                                    <div
                                        role="tabpanel"
                                        hidden={yearValue !== year}
                                        aria-labelledby={`course-year-panel-${year}`}
                                        key={`course-year-panel-${year}`}
                                    >
                                        <h5>{yearText} Year Classes</h5>
                                        {
                                            courses
                                                ?.filter(course => course.recommendedYear === year)
                                                .map(course => <CourseCard course={course} />
                                                )
                                        }
                                    </div>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                </Container>
            </Fragment>

        </DocumentTitle>
    )
}

export default CoursesPage