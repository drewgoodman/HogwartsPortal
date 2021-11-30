import React from 'react'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';

import StudentChipBadges from './StudentChipBadges';
import StudentHouseAvatar from './StudentHouseAvatar';
import StudentPinButton from './StudentPinButton';


function StudentCard({ student }) {

    const enrollYear = student.enrollDate.split('-')[0];
    const fullName = student.firstName + " " + student.lastName

    return (
        <Grid item >
            <Card sx={{ width: { xs: "75vw", sm: 320} }}>
                <CardHeader
                    avatar={
                        <StudentHouseAvatar house={student.house} />
                    }
                    title={
                        <Link color="inherit" underline="none" component={RouterLink} to={`/student/${student.id}`}>
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
                        <ListItemIcon>
                            <ShareIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Enrollment Year"
                            secondary={enrollYear}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ShareIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Courses Assigned"
                            secondary={student.courses?.length}
                        />
                    </ListItem>
                </List>
            </Card>
        </Grid>
    )

}


export default StudentCard
