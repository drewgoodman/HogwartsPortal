import React from 'react'

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { HOUSE_PRIMARY_COLOR, HOUSE_PRIMARY_COLOR_INNERTEXT } from '../../constants/baseConstants';
import { numToNthYear } from '../../utils.js/studentUtils';

function StudentChipBadges({student}) {

    const currentYear = numToNthYear(student.currentYear)

    const houseColor = HOUSE_PRIMARY_COLOR[student.house]
    const houseColorText = HOUSE_PRIMARY_COLOR_INNERTEXT[student.house]

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 1,
                m: 0
            }}
        >
            <Stack spacing={1} direction="row" >
            <Chip
                label={student.house}
                sx={{
                    bgcolor: `${houseColor}`,
                    color: `${houseColorText}`
                }}
            />
            {
                student.status === "ATTENDING" ? (
                    <Chip label={`${currentYear.toUpperCase()} YEAR`} variant="outlined" />
                ) : student.status === "GRADUATED" ? (
                    <Chip label={student.status} variant="outlined" color="success" />
                ) : (
                    <Chip label={student.status} variant="outlined" color="warning" />
                )
            }
            </Stack>
        </Box>
    )
}

export default StudentChipBadges
