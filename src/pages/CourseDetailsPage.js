import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import DocumentTitle from 'react-document-title';

import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../actions/courseActions'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AssignedProfessorListItem from '../components/course/AssignedProfessorListItem';
import GradeTable from '../components/course/GradeTable';
import Loader from '../components/ui/Loader';

import { numToNthYear } from '../utils/studentUtils.js';

function CourseDetailsPage() {


    const match = useParams();
    const dispatch = useDispatch();

    const courseDetails = useSelector(state => state.courseDetails);
    const { loading, course } = courseDetails

    const recommendedYear = useMemo(() => {
        return numToNthYear(course.recommendedYear)
    }, [course.recommendedYear]);

    const [gradesExpanded, setGradesExpanded] = useState(false);

    const handleGradesChange = (panel) => (event, isExpanded) => {
        setGradesExpanded(isExpanded ? panel : false)
    }

    useEffect(() => {
        dispatch(getCourseDetails(match.id));
    }, [dispatch, match])

    return (
        <DocumentTitle title={course ? `Course Detail | ${course.name}` : 'Course Details Loading...'}>
            <Fragment>
                {
                    loading ? <Loader /> : (
                        <Container maxWidth="lg">
                            <Button variant="outlined" component={RouterLink} to="/courses/">
                                &#8592; All Courses
                            </Button>
                            <Toolbar />
                            <Grid container spacing={4} justify="center">
                                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        <Avatar
                                            alt={`${course.name}`}
                                            src={course.image}
                                            sx={{ width: 256, height: 256 }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <Stack spacing={2}>
                                        <Typography variant="h5" component="div" noWrap={true} sx={{ textTransform: "uppercase" }}>
                                            {course.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                listStyle: 'none',
                                                p: 1,
                                                m: 0
                                            }}
                                        >
                                            <Chip
                                                label={`${recommendedYear} Year Course`}
                                            />
                                        </Box>
                                        <AssignedProfessorListItem professorDetails={course?.professorDetails}/>
                                        <Divider />
                                        <Typography variant="h6" component="div">
                                            Enrolled Students:
                                        </Typography>
                                        <Box>
                                            {
                                                course.students?.length > 0 ? (
                                                    <Fragment>
                                                        {
                                                            course.students.map(student => <GradeTable student={student} courseId={course.id} expanded={gradesExpanded} handleChange={handleGradesChange}
                                                                key={`grades-for-${student.id}`} />)
                                                        }
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        No students current enrolled.
                                                        </Fragment>
                                                )
                                            }
                                        </Box>


                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>
                    )
                }
            </Fragment>
        </DocumentTitle>


    )
}

export default CourseDetailsPage
