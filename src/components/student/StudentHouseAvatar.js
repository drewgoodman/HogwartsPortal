import React from 'react'
import Avatar from '@mui/material/Avatar';

import { HOUSE_AVATAR_URLS } from '../../constants/baseConstants';

function StudentHouseAvatar({house}) {

    const avatarUrl = HOUSE_AVATAR_URLS[`${house}`]
    
    return (
        <Avatar
            aria-label="house"
            src={avatarUrl}
            alt={house}/>
    )
}

export default StudentHouseAvatar
