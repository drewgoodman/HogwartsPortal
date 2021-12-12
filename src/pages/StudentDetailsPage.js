import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import DocumentTitle from 'react-document-title';

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'

import { Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
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

import StudentChipBadges from '../components/student/StudentChipBadges';
import StudentCourseTabPanel from '../components/student/StudentCourseTabPanel';

import { NUM_TO_MONTHS } from '../constants/baseConstants';

import { openTagCreateModal, openTagDeleteModal } from '../actions/tagActions';

const TagListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function StudentDetailsPage({ history }) {

    const [courseValue, setCourseValue] = useState(0)

    const match = useParams();
    const dispatch = useDispatch();

    const studentDetails = useSelector(state => state.studentDetails);
    const { loading, student } = studentDetails

    const handleTagDelete = (tagData) => {
        dispatch(openTagDeleteModal(tagData))
    }

    const handleTagCreate = (tagData) => {
        dispatch(openTagCreateModal(tagData))
    }

    useEffect(() => {
        dispatch(getStudentDetails(match.id));
    }, [dispatch, match])

    const handleCourseSelect = (e, newValue) => {
        setCourseValue(newValue)
    }

    const studentInfoList = useMemo(() => {

        const getBirthday = (timestamp) => {
            if (!timestamp) { return "None specified" }
            const [birthYear, birthMonth, birthDay] = timestamp.split('-');
            return `${NUM_TO_MONTHS[parseInt(birthMonth)]} ${birthDay}, ${birthYear}`;
        }

        return [
            {
                title: "Status: ",
                data: student.status || "Not specified"
            },
            {
                title: "Date of Birth:",
                data: getBirthday(student.birthday)
            },
            {
                title: "Skill: ",
                data: student.skill || "Not specified"
            },
            {
                title: "Enroll Year: ",
                data: student.enrollYear || "Not specified"
            }
        ]
    }, [student])


    return (
        <DocumentTitle title={student ? `Student Detail | ${student.firstName} ${student.lastName}` : 'Student Details Loading...'}>
            <Fragment>
                {
                    loading ? <Loader /> : (
                        <Container maxWidth="lg">
                            <Button variant="outlined" component={RouterLink} to="/students/">
                                &#8592; All Students
                            </Button>
                            <Toolbar />
                            <Grid container spacing={4} justify="center">
                                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
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
                                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <Stack spacing={2}>
                                        <Typography variant="h5" component="div" gutterBottom noWrap={true} sx={{ textTransform: "uppercase" }}>
                                            {student.firstName} {student.lastName}
                                        </Typography>
                                        <StudentChipBadges student={student} />
                                        <Divider />
                                        <Grid container spacing={3} sx={{ paddingLeft: 1 }}>
                                            {
                                                studentInfoList?.map(info => (
                                                    <Fragment>
                                                        <Grid item xs={12} sm={2}>
                                                            <strong>{info.title}</strong>
                                                        </Grid>
                                                        <Grid item xs={12} sm={10}>
                                                            {info.data}
                                                        </Grid>
                                                    </Fragment>
                                                ))
                                            }
                                            <Grid item xs={12} sm={2}>
                                                <strong>Tags: </strong>
                                            </Grid>
                                            <Grid item xs={12} sm={10}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: {
                                                            xs: "center",
                                                            sm: "left"
                                                        },
                                                        flexWrap: 'wrap',
                                                        listStyle: 'none',
                                                        p: 0.5,
                                                        m: 0
                                                    }}
                                                    component="ul"
                                                >
                                                    {
                                                        student.tags?.map(tag => (
                                                            <TagListItem key={`tag-${tag.id}`}>
                                                                <Chip
                                                                    onDelete={(e) => handleTagDelete({
                                                                        tagName: tag.name,
                                                                        tagId: tag.id
                                                                    })}
                                                                    label={tag.name} />
                                                            </TagListItem>
                                                        ))
                                                    }
                                                    <TagListItem>
                                                        <Chip
                                                            label="Add New Tag"
                                                            icon={<AddIcon />}
                                                            variant="outlined"
                                                            onClick={(e) => handleTagCreate({
                                                                studentId: student.id,
                                                                studentTags: student.tags.map(tag => tag.name)
                                                            })}
                                                        />
                                                    </TagListItem>
                                                </Box>
                                            </Grid>
                                        </Grid>


                                        <Divider />
                                        {
                                            student.status === "ATTENDING" ?
                                                student.courses.length === 0 ?
                                                    (
                                                        <Fragment>Not currently enrolled in any courses.</Fragment>
                                                    ) : (
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
                                                                            key={`course-info-${index}`}
                                                                        />)
                                                                }
                                                            </Box>
                                                        </Paper>
                                                    ) : (
                                                    <Fragment> Not a current student at Hogwarts.</Fragment>
                                                )
                                        }
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Container>)
                }

            </Fragment>

        </DocumentTitle>
    )

}

export default StudentDetailsPage
