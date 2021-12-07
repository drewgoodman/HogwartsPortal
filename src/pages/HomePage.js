import React, { Fragment, useEffect } from 'react'
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux'

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import { listStudents } from '../actions/studentActions';

import Loader from '../components/ui/Loader';
import StudentCard from '../components/student/StudentCard';

function HomePage() {

    const dispatch = useDispatch()

    const studentList = useSelector(state => state.studentList)
    const pinnedList = useSelector(state => state.dashboard.pinnedStudents)

    const { students, loading: studentLoading } = studentList

    useEffect(() => {
        dispatch(listStudents())
    }, [dispatch])

    return (
        <DocumentTitle title="Hogwarts Faculty Portal | Dashboard">
            <Fragment>
                <Toolbar />
                <Container maxWidth="lg">
                    <h1>Pinned Profiles</h1>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                    >
                    {studentLoading && <Loader />}
                    {
                        students
                            ?.filter(student => { return pinnedList.includes(student.id) })
                            ?.map(student => (
                                <SwiperSlide>
                                <StudentCard student={student} key={student.id} />
                                </SwiperSlide>
                            ))
                    }
                    </Swiper>

                </Container>
            </Fragment>

        </DocumentTitle>
    )
}

export default HomePage
