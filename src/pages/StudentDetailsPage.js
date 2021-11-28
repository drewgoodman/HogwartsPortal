import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getStudentDetails } from '../actions/studentActions'

import Avatar from '@mui/material/Avatar';

import Loader from '../components/ui/Loader';

function StudentDetailsPage({ history }) {

    const match = useParams();
    console.log(match)
    const dispatch = useDispatch();

    const studentDetails = useSelector(state => state.studentDetails);
    const { loading, error, student } = studentDetails

    useEffect(()=> {
        dispatch(getStudentDetails(match.id));
    }, [dispatch, match])


    return (
        loading ? <Loader /> : (  
        <div>
        <h1>{student.firstName} {student.lastName}</h1>
        <Avatar
                        alt={`${student.firstName} ${student.LastName}`}
                        src={student.image}
                        sx={{ width: 256, height: 256}}
                        />
    </div>
        )
    )
}

export default StudentDetailsPage
