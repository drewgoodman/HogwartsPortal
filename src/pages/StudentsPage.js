import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

import { listStudents } from '../actions/studentActions';

import Loader from '../components/ui/Loader';
import StudentCard from '../components/student/StudentCard';
import StudentFilters from '../components/student/StudentFilters';

function StudentsPage() {

    const dispatch = useDispatch()

    const studentList = useSelector(state => state.studentList)
    const { students, loading: studentLoading, error: studentError } = studentList

    const [nameQuery, setNameQuery] = useState("");
    const [tagQuery, setTagQuery] = useState("");
    const [statusQuery, setStatusQuery] = useState("");
    const [houseQuery, setHouseQuery] = useState([true,true,true,true]);



    const filterByName = (firstName, lastName) => {
        let fullName = [firstName, lastName].join(" ");

        const filterContainsName = (name) => {
            return name.toLowerCase().includes(nameQuery.toLowerCase()) ? true : false;
        }

        if (
            filterContainsName(firstName) ||
            filterContainsName(lastName) ||
            filterContainsName(fullName)) {
            return true;
        }
        return false;
    }

    const filterByTag = (student) => {
        if (!tagQuery) { return true; }
        let tagFilterCheck = student.tags.find(tag => tag.toLowerCase().includes(tagQuery.toLowerCase()))
        return tagFilterCheck;
    }

    useEffect(() => {
        dispatch(listStudents())
    }, [dispatch])

    return (
        <div>
            <h1>Student Roster</h1>
            <StudentFilters
                nameQuery={nameQuery}
                setNameQuery={setNameQuery}
                tagQuery={tagQuery}
                setTagQuery={setTagQuery}
                statusQuery={statusQuery}
                setStatusQuery={setStatusQuery}
                houseQuery={houseQuery}
                setHouseQuery={setHouseQuery}
             />
            <Toolbar />
            <Container maxWidth="lg">
                {studentLoading && <Loader/> }
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    {
                        students
                            ?.filter(student => filterByName(student.firstName, student.lastName))
                            .filter(student => filterByTag(student))
                            ?.map(student => <StudentCard student={student} key={student.id} />)
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default StudentsPage
