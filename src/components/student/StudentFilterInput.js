import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function StudentFilterInput({ textValue, setTextValue, placeholder, textType = "", autoCompleteList = [] }) {

    const handleOnAutoChange = (e, value) => {
        setTextValue(value ? value : "");
    }

    return (
        <Autocomplete
            freeSolo
            options={autoCompleteList}
            onChange={(e, value)=> handleOnAutoChange(e, value)}
            value={textValue}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={placeholder}
                    onChange={(e) => setTextValue(e.target.value.trimStart().toLowerCase())}
                    placeholder={placeholder}
                />}
        />

    )
}

export default StudentFilterInput


// import React from 'react'


// function TextInput({ textValue, setTextValue, placeholder, textType="" }) {
//     return (
//         <input
//             type="text"
//             className={"text-input " + textType}
//             placeholder={placeholder}
//             value={textValue}
//             onChange={(e) => setTextValue(e.target.value.trimStart())}
//         />
//     )
// }

// export default TextInput
