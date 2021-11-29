import React, { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import Loader from '../components/ui/Loader';
import StudentCourseTabPanel from '../components/student/StudentCourseTabPanel';
import { Select } from '@mui/material';

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
                <Button variant="outlined" component={RouterLink} to="/students/">
                    &#8592; All Students
                </Button>
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
                                        icon={<AddIcon />}
                                        variant="outlined"
                                    // onClick={}
                                    />
                                </TagListItem>
                            </Box>
                            <Divider />
                            {
                                student.status === "ATTENDING" ?
                                    (
                                        <Paper>
                                            <Box sx={{ bgcolor: 'background.paper' }}>
                                                <Typography variant="h5" component="div">
                                                    Enrolled Classes
                                                </Typography>
                                                {/* TABS DESKTOP ONLY */}
                                                <Tabs
                                                    value={courseValue}
                                                    onChange={handleCourseSelect}
                                                    variant="scrollable"
                                                    scrollButtons="auto"
                                                    aria-label="scrollable classes"
                                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                                >
                                                    {
                                                        student.courses?.map((course, index) => (
                                                            <Tab label={course.name} value={index} key={`course-tab-${index}`} />
                                                        ))
                                                    }
                                                </Tabs>
                                                {/* DROPDOWN MOBILE ONLY */}
                                                <FormControl
                                                    sx={{ display: { sm: 'none' } }}
                                                    fullWidth
                                                >
                                                    <InputLabel id="student-course-filter">Course Info</InputLabel>
                                                    <Select
                                                        labelId="filter-student-course-label"
                                                        id="filter-student-course"
                                                        value={courseValue}
                                                        label="Course Info"
                                                        onChange={(e) => handleCourseSelect(e, e.target.value)}
                                                    >
                                                        {
                                                            student.courses?.map((course, index) => <MenuItem value={index} key={`course-dropdown-${index}`}>{course.name}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
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
                                    ) : (
                                        <div> Not a current student at Hogwarts.</div>
                                    )
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        )
    )
}

export default StudentDetailsPage
