import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Loader from '../components/ui/Loader';

function StudentDetailsPage({ history }) {

    const match = useParams();
    const dispatch = useDispatch();

    const studentDetails = useSelector(state => state.studentDetails);
    const { loading, error, student } = studentDetails

    useEffect(() => {
        dispatch(getStudentDetails(match.id));
    }, [dispatch, match])


    return (
        loading ? <Loader /> : (
            <Container maxWidth="lg">
                <Toolbar />
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={4}>
                        <Avatar
                            alt={`${student.firstName} ${student.LastName}`}
                            src={student.image}
                            sx={{ width: 256, height: 256 }}
                        />
                        <Typography variant="h5" component="div">
                            Tags
                        </Typography>
                        {
                            student.tags?.map(tag => <div>{tag}</div>)
                        }
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h4" component="div" gutterBottom noWrap={true} sx={{ textTransform: "uppercase" }}>
                            {student.firstName} {student.lastName}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <Typography variant="h5" component="div">
                        Enrolled Classes
                    </Typography>
                    <Tabs
                        // value={}
                        // onChange={}
                        variant="scollable"
                        scrollButtons="auto"
                        aria-label="scrollable classes"
                    >
                    {
                        student.courses?.map((course, index) => (
                            <Tab label={course.name} />
                        ))
                    }
                    </Tabs>
                </Box>
                <Box>

                    {
                        student.courses?.map((course, index) => (
                                <div>Info on {course.name}</div>
                        ))
                    }
                </Box>
            </Container>
        )
    )
}

export default StudentDetailsPage
