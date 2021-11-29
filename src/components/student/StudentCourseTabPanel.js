import React from 'react'
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import CoursesPage from '../../pages/CoursesPage';

function StudentCourseTabPanel(props) {
    const { value, index, course } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`student-course-panel-${index}`}
        >
            <Toolbar />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {course.name}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        course.grades.length === 0 ? (
                            <div>No grade data available.</div>
                        ) : (

                            <TableContainer>
                            <Table sx={{}} aria-label="course grade table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Test Date</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        course.grades.map((grade, index) => (
                                            <TableRow key={`${course.name}-grade${index}`}>
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

                </Grid>

            </Grid>

        </div>
    )
}

export default StudentCourseTabPanel
