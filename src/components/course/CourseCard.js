import React, { Fragment } from 'react'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@mui/material/Typography';

function CourseCard({course}) {
    return (
        <Fragment>
            <Link color="inherit" underline="none" component={RouterLink} to={`/course/${course.id}`}>
                <Typography variant="body1" component="div" noWrap={true}>{course.name}</Typography>
            </Link>
        </Fragment>
    )
}

export default CourseCard
