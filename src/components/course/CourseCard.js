import React from 'react'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import PeopleIcon from '@mui/icons-material/People';

function CourseCard({ course }) {
    return (
        <Card sx={{ display: "block", width: "auto" }}>
            <CardHeader
                title={
                    <Link color="inherit" underline="none" component={RouterLink} to={`/course/${course.id}`} >
                        <Typography variant="h6" component="div">{course.name}</Typography>
                    </Link>
                }
            />
            <CardMedia
                component="img"
                sx={{ height: 150 }}
                image={course.image}
                alt={course.name}
            />
            <List dense>
                {
                    course.professorDetails ? (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={`${course.professorDetails.firstName} ${course.professorDetails.lastName}`} src={course.professorDetails.image} />
                            </ListItemAvatar>
                            <ListItemText>
                                <ListItemText primary={`${course.professorDetails.firstName} ${course.professorDetails.lastName}`} secondary="Assigned Professor" />
                            </ListItemText>
                        </ListItem>
                    ) : (
                        <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Unassigned" sx={{ bgcolor: "gray"}}>??</Avatar>
                        </ListItemAvatar>
                            <ListItemText primary="Professor Unknown" secondary="None assigned" />
                        </ListItem>
                    )
                }
                <ListItem>
                    <ListItemIcon sx={{ alignContent: "center"}}>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={`${course.studentCount} student${course.studentCount === 1 ? "" : "s"}`}
                        secondary="Currently Enrolled"
                    />
                </ListItem>
            </List>
            <CardActions>
                <Button size="small" sx={{ flexGrow: 1, justifyContent: "right" }} component={RouterLink} to={`/course/${course.id}`}>
                    More Info &#8594;
                </Button>
            </CardActions>
        </Card>
    )
}

export default CourseCard
