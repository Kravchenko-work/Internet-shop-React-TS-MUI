import React, {FC} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";

import {IMuiSelect} from "./../../types"

const MuiSelect:FC<IMuiSelect> = (
    {
        options,
        register = () => {},
        error,
        helperText,
        label,
        defaultValue,
        onFocus,
        onClose
    }) => {
    return (
        <FormControl error={error} fullWidth>
            <InputLabel >{label}</InputLabel>
            <Select
                label={label}
                {...register()}
                defaultValue={defaultValue}
                onFocus={onFocus}
                onClose={onClose}
            >
                {options.map((item) => (
                    <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}


export default MuiSelect;