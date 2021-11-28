import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';

import Loader from '../ui/Loader';
import StudentFilterInput from './StudentFilterInput';

import { getTags } from '../../actions/tagActions';

const studentAutoList = ["Harry Potter", "Ronald Weasley", "Hermione Granger", "Draco Malfoy"]
const houseList = ["Gryffindor","Hufflepuff","Ravenclaw","Slytherin"]

function StudentFilters({ nameQuery, setNameQuery, tagQuery, setTagQuery, statusQuery, setStatusQuery, houseQuery, setHouseQuery }) {

    const dispatch = useDispatch()

    const tags = useSelector(state => state.tags)
    const { loading, error, tagsList } = tags

    useEffect(() => {
        dispatch(getTags());
    }, [dispatch])

    return (
        loading ? <Loader/> : (
            <Grid container spacing={2}>
            <Grid item xs={12} lg={5} md={5} sm={12}>
                <StudentFilterInput textValue={nameQuery} setTextValue={setNameQuery} placeholder="Search by Name" textType="filter" autoCompleteList={studentAutoList} />
            </Grid>
            <Grid item xs={12} lg={5} md={5} sm={12}>
                <StudentFilterInput textValue={tagQuery} setTextValue={setTagQuery} placeholder="Search by Tag" textType="filter" autoCompleteList={tagsList} />
            </Grid>
            <Grid item xs={12} lg={2} md={2} sm={12}>
                <FormControl fullWidth>
                    <InputLabel id="filter-student-status-label">Status</InputLabel>
                    <Select
                        labelId="filter-student-status-label"
                        id="filter-student-status"
                        value={statusQuery}
                        label="Status"
                        placeholder="Searchy by Status"
                        onChange={(e) => setStatusQuery(e.target.value)}
                    >
                        <MenuItem value=''>All</MenuItem>
                        <MenuItem value='attending'>Attending</MenuItem>
                        <MenuItem value='graduated'>Graduated</MenuItem>
                        <MenuItem value='expelled'>Expelled</MenuItem>
                        <MenuItem value='unavailable'>Unavailable</MenuItem>
                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={12} lg={12} md={12} sm={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">House Filter:</FormLabel>
                    <FormGroup aria-label="houses" row>
                        {
                            houseList.map((house, index) => (
                                <FormControlLabel
                                    control={<Checkbox/>}
                                    label={house}
                                    labelPlacement="bottom"
                                    checked={houseQuery[index]}
                                    // TODO: How to update state??
                                />
                            ))
                        }
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
        )
    )
}

export default StudentFilters
