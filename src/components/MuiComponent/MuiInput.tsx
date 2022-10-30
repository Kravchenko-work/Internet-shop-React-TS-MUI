import React, {FC} from 'react';
import {TextField} from "@mui/material";

import {IMuiInput} from "./typesMui"

const MuiInput:FC<IMuiInput> = (
    {
        register = () => {},
        error,
        helperText,
        label,
        onInput,
        onFocus,
        readOnly = false,
    }) => {

    return (
        <TextField
            fullWidth
            variant={readOnly ? "filled" : "outlined"}
            margin="normal"
            hiddenLabel={readOnly}
            label={readOnly ? null : label}
            {...register()}
            error={error}
            helperText={helperText}
            onInput={onInput}
            onFocus={onFocus}
            InputProps={{
                readOnly: readOnly,
            }}
        />
    );
}

export default MuiInput;