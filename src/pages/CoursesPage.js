import React, { Fragment, useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { listCourses } from '../actions/courseActions';
import { numToNthYear } from '../utils/studentUtils';

import CourseCard from '../components/course/CourseCard';
import Loader from '../components/ui/Loader';

function CoursesPage() {

    const theme = useTheme();
    const tabBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));

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
                <Toolbar />
                <Typography gutterBottom variant="h5" component="div" noWrap={true} sx={{ textTransform: "uppercase" }}>
                    Course Catalogue
                </Typography>
                <Container sx={{marginTop: 5}}>
                    <Grid container maxWidth="lg" spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Box sx={{ bgcolor: 'background.paper' }}>
                                <Tabs
                                    value={yearValue}
                                    onChange={handleYearSelect}
                                    orientation={tabBreakpoint ? "vertical" : "horizontal"}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="scrollable force tabs example"
                                    sx={{ borderRight: { xs: 0, sm: 1 }, borderColor: {xs: 'none', sm: 'divider'}}}
                                >
                                    {
                                        courseYearList.map(year => {
                                            const yearText = numToNthYear(year)

                                            return (
                                                <Tab key={`course-year-tab-${year}`} label={`${yearText} Year`} value={year} sx={{ justifyContent: "right" }} />
                                            )
                                        })
                                    }
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            {courseLoading && <Loader />}
                            {
                                courseYearList.map(year => {
                                    return (
                                        <div
                                            role="tabpanel"
                                            hidden={yearValue !== year}
                                            aria-labelledby={`course-year-panel-${year}`}
                                            key={`course-year-panel-${year}`}
                                        >
                                            <Grid container spacing={2}>
                                                {
                                                    courses
                                                        ?.filter(course => course.recommendedYear === year)
                                                        .map(course => (
                                                            <Grid item sx={{ display: "block", width: { xs: "100%", sm: 320 } }} key={`course-card-${course.id}`}>
                                                                <CourseCard course={course} />
                                                            </Grid>
                                                        ))
                                                }
                                            </Grid>
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