import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'


import Avatar from '@mui/material/Avatar';

function StudentDetailsPage({ history }) {

    const {match} = useParams()
    const dispatch = useDispatch();

    const studentDetails = useSelector(state => state.studentDetails);
    const { loading, error, student } = studentDetails

    useEffect(()=> {
        dispatch(getStudentDetails(match));
    }, [dispatch, match])


    return (
        <div>
            <h1>{student.firstName} {student.lastName}</h1>
            <Avatar
                            alt={`${student.firstName} ${student.LastName}`}
                            src={student.image}
                            sx={{ width: 128, height: 128}}
                            />
        </div>
    )
}

export default StudentDetailsPage
