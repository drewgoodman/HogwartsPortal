import React, { Fragment, useState, useEffect } from 'react'
import DocumentTitle from 'react-document-title';
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
    const { students, loading: studentLoading } = studentList

    const [nameQuery, setNameQuery] = useState("");
    const [tagQuery, setTagQuery] = useState("");
    const [statusQuery, setStatusQuery] = useState("Attending");
    const [houseQuery, setHouseQuery] = useState({
        Gryffindor: true,
        Ravenclaw: true,
        Hufflepuff: true,
        Slytherin: true
    });

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

    const filterByStatus = (student) => {
        if (!statusQuery) { return true; }
        if (statusQuery.toUpperCase() === student.status) {
            return true;
        }
        return false;
    }

    const filterByHouse = (student) => {
        for (const house in houseQuery) {
            if (house.toUpperCase() === student.house && houseQuery[house]) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        dispatch(listStudents())
    }, [dispatch])

    return (
        <DocumentTitle title="Student Roster">
        <Fragment>
            <Toolbar />
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
                <Grid container spacing={3}>
                    {
                        students
                            ?.filter(student => filterByName(student.firstName, student.lastName))
                            .filter(student => filterByTag(student))
                            .filter(student => filterByStatus(student))
                            .filter(student => filterByHouse(student))
                            ?.map(student => <StudentCard student={student} key={student.id} />)
                    }
                </Grid>
            </Container>
        </Fragment>

        </DocumentTitle>
    )
}

export default StudentsPage
