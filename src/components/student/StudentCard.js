import React, { useState } from 'react'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import StudentPinButton from './StudentPinButton';


const numToWords = (number) => {
    const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
    return words[number]
}

function StudentCard({ student, nameQuery = "", tagQuery = "" }) {

    const currentYear = numToWords(student.currentYear)
    const enrollYear = student.enrollDate.split('-')[0];
    const fullName = student.firstName + " " + student.lastName

    return (
        <Grid item >
            <Card sx={{width: 320}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500]}} aria-label="house">
                            R
                        </Avatar>
                    }
                    title={
                        <Link color="inherit" underline="none" component={RouterLink} to={`/student/${student.id}`}>
                            <Typography variant="h6" component="div" noWrap="true">{fullName}</Typography>
                        </Link>
                    }
                    subheader="Attending"
                    action={
                        <StudentPinButton studentId={student.id} />
                    }
                />
                <CardMedia
                    component="img"
                    sx={{ height: 230 }}
                    image={student.image}
                    alt={student.firstName} />
                <List dense="true">
                    <ListItem>
                        <ListItemIcon>
                            <ShareIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Enrollment Year"
                            secondary={enrollYear}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ShareIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Courses Assigned"
                            secondary={student.courses?.length}
                        />
                    </ListItem>
                </List>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {student.firstName} {student.lastName}
                        </Typography>
                        <Typography varient="subtitle1" color="text.secondary" component="div">
                            Year {currentYear}
                        </Typography>
                    </CardContent>
            </Card>
        </Grid>

        // <Paper elevation={4}>{student.firstName}</Paper>

        // <div>
        //     <img src={student.image} alt={student.firstName} className="student-image" />
        //     <h1>{student.firstName} {student.lastName}</h1>
        //     <div>Skill: {student.skill}</div>
        //     <div>Class: Year {currentYear}</div>
        //     <div>Enrollment Year: {enrollYear}</div>
        //     {
        //         student.tags.map(tag => <div>{tag}</div>)
        //     }
        //     {
        //         student.courses.map(course =>
        //             <div>{course.name}
        //                 {
        //                     course.grades?.map(grade =>
        //                         <div>{grade.grade}</div>
        //                     )
        //                 }
        //             </div>
        //         )
        //     }
        // </div>
    )

}


export default StudentCard
