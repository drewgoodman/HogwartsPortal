import React, { Fragment, useMemo } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function GradeTable(props) {

    const { student, expanded, handleChange } = props;

    const getGradeAverage = (grades) => {

        if (grades.length > 0) {
            let gradeTotal = grades
                .map(grade => parseInt(grade.grade))
                .reduce((a, b) => a + b, 0);

            return gradeTotal / grades.length;
        }
        return 0;
    }

    const gradeAverage = useMemo(() => {
        return getGradeAverage(student.grades)
    }, [student.grades])

    return (
        <Accordion
            expanded={expanded === student.id}
            onChange={handleChange(student.id)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${student.id}bh-content`}
                id={`${student.id}-header`}
            >
                <Avatar alt={`${student.firstName} ${student.lastName}`} src={student.image} />
                <Typography sx={{ width: '33%', flexShrink: 0, alignSelf: "center", marginLeft: 2 }}>
                    {student.firstName} {student.lastName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', alignSelf: "center", marginLeft: 2 }}>
                    {
                        student.grades.length === 0 ? (
                            <Fragment>Currently enrolled</Fragment>
                        ) : (
                            <Fragment>{student.grades.length} Grade{student.grades.length === 1 ? "" : "s"}</Fragment>
                        )
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    student.grades.length === 0 ? (
                        <Fragment>No grades currently available.</Fragment>
                    ) : (
                        <TableContainer>
                            <Table sx={{}} aria-label="course grade table">
                                <TableHead>
                                    <TableRow>
                                        Overall Grade Average: {gradeAverage.toFixed(2)}%
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Test Date</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        student.grades.map(grade => (
                                            <TableRow key={`grade-${grade.id}`}>
                                                <TableCell align="left">{grade.date}</TableCell>
                                                <TableCell align="left">{grade.grade}%</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default GradeTable
