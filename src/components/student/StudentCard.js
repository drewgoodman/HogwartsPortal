import React from 'react'
import Link from '@mui/material/Link';
import { useMatch, useResolvedPath, Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import StudentChipBadges from './StudentChipBadges';
import StudentHouseAvatar from './StudentHouseAvatar';
import StudentPinButton from './StudentPinButton';


function StudentCard({ student }) {

    const enrollYear = student.enrollDate.split('-')[0];
    const fullName = student.firstName + " " + student.lastName;
    const resolved = useResolvedPath('/');
    const fromDashboard = useMatch({path: resolved.pathname, end: true});

    return (
        <Card sx={{ display: "block", width: "auto" }}>
            <CardHeader
                avatar={
                    <StudentHouseAvatar house={student.house} />
                }
                title={
                    <Link color="inherit" underline="none" component={RouterLink} to={`/student/${student.id}`} state={{ fromDashboard: fromDashboard ? true : false }}>
                        <Typography variant="h6" component="div" noWrap={true}>{fullName}</Typography>
                    </Link>
                }
                action={
                    <StudentPinButton studentId={student.id} sx={{
                        display: { xs: 'none', sm: 'block' }
                    }} />
                }
            />
            <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={student.image}
                alt={student.firstName} />
            <StudentChipBadges student={student} />
            <List dense={true}>
                <ListItem>
                    <ListItemText
                        primary={`Enrolled in ${enrollYear}`}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={`${student.enrolledCount} Courses Assigned`}
                    />
                </ListItem>
                <CardActions>
                    <Button size="small" sx={{ flexGrow: 1, justifyContent: "left" }} component={RouterLink} to={`/student/${student.id}`} state={{ fromDashboard: fromDashboard ? true : false }}>
                        More Info &#8594;
                    </Button>
                    <StudentPinButton studentId={student.id} sx={{
                        display: { xs: 'block', sm: 'none' }
                    }} />
                </CardActions>

            </List>
        </Card>
    )

}


export default StudentCard
