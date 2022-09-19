import React, {FC} from 'react';
import {TextField} from "@mui/material";

import {IMuiInput} from "./../../types"

const MuiInput:FC<IMuiInput> = (
    {
        register = () => {},
        error,
        helperText,
        label,
        onInput,
        onFocus
    }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label={label}
            {...register()}
            error={error}
            helperText={helperText}
            onInput={onInput}
            onFocus={onFocus}
        />
    );
}


export default MuiInput;