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
import { STUDENT_STATUS_OPTIONS } from '../../constants/baseConstants';

const houseList = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]

function StudentFilters({
    nameQuery,
    setNameQuery,
    tagQuery,
    setTagQuery,
    statusQuery,
    setStatusQuery,
    houseQuery,
    setHouseQuery
    }) {

    const dispatch = useDispatch()

    const tags = useSelector(state => state.tags)
    const studentNames = useSelector(state => state.studentList.studentNames)
    const { loading, error, tagsList } = tags
    

    useEffect(() => {
        dispatch(getTags());
    }, [dispatch])


    const allHousesSelected = () => {
        const queryValues = Object.values(houseQuery)
        if (queryValues.includes(false)) {
            return false;
        }
        return true;
    }

    const handleSelectAllHouses = () => {
        if (allHousesSelected()) {
            setHouseQuery({
                Gryffindor: false,
                Ravenclaw: false,
                Hufflepuff: false,
                Slytherin: false
            })
        } else {
            setHouseQuery({
                Gryffindor: true,
                Ravenclaw: true,
                Hufflepuff: true,
                Slytherin: true
            })
        }
    }

    const handleToggleHouse = (e) => {
        let house = e.target.value
        let currentValue = houseQuery[house]
        setHouseQuery(
            prevState => ({
                ...prevState,
               [house]: !currentValue
            })
        )
    }

    return (
        loading ? <Loader /> : (
            <Grid container spacing={2}>
                <Grid item xs={12} lg={5} md={5} sm={12}>
                    <StudentFilterInput textValue={nameQuery} setTextValue={setNameQuery} placeholder="Search by Name" textType="filter" autoCompleteList={studentNames} />
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
                            {
                                STUDENT_STATUS_OPTIONS.map(option => <MenuItem value={option} key={`filter-${option}`}>{option}</MenuItem>)
                            }
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">House Filter:</FormLabel>
                        <FormGroup aria-label="houses" row>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="All"
                                labelPlacement="bottom"
                                checked={allHousesSelected()}
                                onChange={handleSelectAllHouses}
                            />
                            {
                                houseList.map((house, index) => (
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={house}
                                        labelPlacement="bottom"
                                        checked={houseQuery[`${house}`]}
                                        value={house}
                                        onChange={handleToggleHouse}
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
