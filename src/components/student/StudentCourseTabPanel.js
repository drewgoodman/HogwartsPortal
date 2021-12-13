import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function StudentCourseTabPanel(props) {

    const { value, index, course } = props;

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
        return getGradeAverage(course.grades)
    }, [course.grades])

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`student-course-panel-${index}`}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={2} sx={{ padding: "10px" }}>
                        <Typography variant="h6" component="div" sx={{ textTransform: "uppercase" }}>
                            {course.name}
                        </Typography>
                        <Typography variant="text">
                            <strong>Overall Grade Average:</strong> {gradeAverage.toFixed(2)}%
                        </Typography>
                        <Button size="small" component={RouterLink} to={`/course/${course.id}`} sx={{ justifyContent: "left" }}>
                            View Course Details &#8594;
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        course.grades.length === 0 ? (
                            <Box sx={{ padding: 2}}>
                            <Typography variant="text" >No grade data available.</Typography>
                            </Box>
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
