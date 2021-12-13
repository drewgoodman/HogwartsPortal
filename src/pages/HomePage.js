import React, { Fragment, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css';

import { listStudents } from '../actions/studentActions';
import Loader from '../components/ui/Loader';
import StudentCard from '../components/student/StudentCard';

import { NUM_TO_MONTHS } from '../constants/baseConstants';

// install Swiper modules
SwiperCore.use([Navigation]);

const upcomingMonths = () => {

    const checkMonth = (month) => {
        if (month === 0) { return 0 }
        return month
    }

    const date = new Date();
    let currentMonth = date.getMonth();
    const birthdayMonths = Array.from({ length: 3 }, (_, i = currentMonth) => checkMonth(i))
    birthdayMonths.unshift(currentMonth)
    return birthdayMonths

}

const checkBirthMonth = (birthday, currentMonth) => {
    if (birthday) {
        const birthMonth = parseInt(birthday.split("-")[1]) - 1;
        if (birthMonth === currentMonth) { return true };
        return false;
    }
    return false;
}

function HomePage() {

    const dispatch = useDispatch()

    const studentList = useSelector(state => state.studentList)
    const pinnedList = useSelector(state => state.dashboard.pinnedStudents)

    const { students, loading: studentLoading } = studentList

    const birthdayMonthsList = upcomingMonths();

    useEffect(() => {
        dispatch(listStudents())
    }, [dispatch])

    return (
        <DocumentTitle title="Hogwarts Faculty Portal | Dashboard">
            <Fragment>
                <Toolbar />
                <Container maxWidth="full">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} md={9}>

                            <Typography gutterBottom variant="h5" component="div" noWrap={true} sx={{ textTransform: "uppercase" }}>
                                Pinned Profiles
                            </Typography>
                            {studentLoading ? <Loader /> : (
                                pinnedList.length === 0 ? (
                                    <Fragment>No students pinned.
                                        <Button size="small" component={RouterLink} to={'/students/'}>
                                            Click here to view student roster. &#8594;
                                        </Button>
                                        </Fragment>
                                ) : (
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={5}
                                        navigation
                                        observer
                                        observeParents
                                        breakpoints={{
                                            "820": {
                                                "slidesPerView": 2
                                            },
                                            "1400": {
                                                "slidesPerView": 3
                                            }
                                        }}
                                    >
                                        {
                                            students
                                                ?.filter(student => { return pinnedList.includes(student.id) })
                                                ?.map(student => (
                                                    <SwiperSlide key={`slide-${student.id}`}>

                                                        <Box sx={{ display: "block", width: "auto", maxWidth: 320 }} >
                                                            <StudentCard student={student} key={student.id} />
                                                        </Box>
                                                    </SwiperSlide>
                                                ))
                                        }
                                    </Swiper>
                                )
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                            <Typography gutterBottom variant="h5" component="div" noWrap={true} sx={{ textTransform: "uppercase" }}>
                                Upcoming Birthdays
                            </Typography>
                            {
                                birthdayMonthsList.map(month => (
                                    <List key={`month-${month}`} subheader={<ListSubheader>{NUM_TO_MONTHS[month]}</ListSubheader>}>
                                        {
                                            students
                                                ?.filter(student => { return checkBirthMonth(student.birthday, month) })
                                                .map(student =>
                                                (

                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar alt={`${student.firstName}`} src={student.image} />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={`${student.firstName} ${student.lastName}`} secondary="Jan 9, 2014" />
                                                    </ListItem>
                                                ))
                                        }
                                    </List>
                                ))
                            }

                        </Grid>
                    </Grid>

                </Container>

            </Fragment>

        </DocumentTitle>
    )
}

export default HomePage
