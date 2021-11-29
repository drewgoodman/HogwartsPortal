import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import Loader from '../components/ui/Loader';
import StudentCourseTabPanel from '../components/student/StudentCourseTabPanel';

const TagListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function StudentDetailsPage({ history }) {

    const [courseValue, setCourseValue] = useState(0)

    const match = useParams();
    const dispatch = useDispatch();

    const studentDetails = useSelector(state => state.studentDetails);
    const { loading, error, student } = studentDetails

    useEffect(() => {
        dispatch(getStudentDetails(match.id));
    }, [dispatch, match])

    const handleCourseSelect = (e, newValue) => {
        setCourseValue(newValue)
    }


    return (
        loading ? <Loader /> : (
            <Container maxWidth="lg">
                <Toolbar />
                <Grid container spacing={8} justify="center">
                    <Grid item xs={12} sm={12} md={4}>
                            <Box
                                display="flex"
                                justifyContent="center"
                            >
                                <Avatar
                                    alt={`${student.firstName} ${student.LastName}`}
                                    src={student.image}
                                    sx={{ width: 256, height: 256 }}
                                />
                            </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Stack spacing={3}>
                        <Typography variant="h4" component="div" gutterBottom noWrap={true} sx={{ textTransform: "uppercase" }}>
                            {student.firstName} {student.lastName}
                        </Typography>
                        Student Data Goes Here
                        <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0
                                }}
                                component="ul"
                            >
                                {
                                    student.tags?.map(tag => (
                                        <TagListItem key={`tag-${tag}`}>
                                            <Chip
                                                label={tag} />
                                        </TagListItem>
                                    ))
                                }
                                <TagListItem>
                                    <Chip
                                        label="Add New Tag"
                                        icon={<AddIcon/>}
                                        variant="outlined"
                                        // onClick={}
                                    />
                                </TagListItem>
                            </Box>
                <Divider />
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <Typography variant="h5" component="div">
                        Enrolled Classes
                    </Typography>
                    <Tabs
                        value={courseValue}
                        onChange={handleCourseSelect}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable classes"
                    >
                        {
                            student.courses?.map((course, index) => (
                                <Tab label={course.name} value={index} key={`course-tab-${index}`} />
                            ))
                        }
                    </Tabs>
                </Box>
                <Paper>
                <Box>

                    {
                        student.courses?.map((course, index) => 
                        <StudentCourseTabPanel
                            value={courseValue}
                            index={index}
                            course={course}
                        />)
                    }
                </Box>

                </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        )
    )
}

export default StudentDetailsPage
