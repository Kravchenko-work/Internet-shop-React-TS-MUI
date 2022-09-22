import React, {FC} from 'react';
import ReactPhoneInput from 'react-phone-input-material-ui';
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

import s from "./index.module.scss";
import {IMuiPhone} from "../../types";



const MuiPhone:FC<IMuiPhone> = ({control}) => {
    return (
        <Controller
            control={control}
            name="phone"
            rules={{
                required: "Phone is a required field!",
                pattern: {
                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: "Phone should have correct format"
                }
            }}
            render={
                ({field: {onChange, value, ref}, fieldState: {error}}) => (
                    <div className={s.phone}>
                        <ReactPhoneInput
                            component={TextField}
                            value={value}
                            onChange={(newValue) => {
                                onChange(newValue)
                                return newValue
                            }}
                            isValid={() => {
                                return error ? error.message as string : true
                            }}
                        />
                    </div>
                )
            }
        />
    );
}

export default MuiPhone;