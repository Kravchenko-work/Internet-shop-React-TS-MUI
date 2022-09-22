import React, {FC, forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Button, Container, Theme } from "@mui/material";
import {SubmitHandler, useForm } from "react-hook-form";

import MuiInput from "../../../components/MuiComponent/MuiInput";

import {IFormPersonalData} from "./../../../types"
import MuiPhone from "../../../components/MuiComponent/MuiPhone";

interface IPersonalData {
    useForm: any
}

const PersonalData:FC<IPersonalData> = (
    {
        useForm: { register, handleSubmit, formState: { errors }, control }
    }
) => {
    return (
        <Container
            style={{marginTop: '20px'}}
            component="main"
            maxWidth="xs"
        >
            <MuiInput
                register={() => {return register("name", {
                    required: "Name is a required field!",
                    pattern: {
                        value:  /^([^0-9]*)$/,
                        message: "Name should not contain numbers"
                    }
                })}}
                error={Boolean(errors.name)}
                helperText={errors?.name?.message}
                label="Name"
            />
            <MuiInput
                label="Email"
                register={() => {return register("email", {
                    required: "Email is a required field!",
                    pattern: {
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                        message: "Email should have correct format"
                    }

                })}}
                error={!!errors.email}
                helperText={errors?.email?.message}
            />
            <MuiPhone
                control={control}
            />
        </Container>
    );
};

export default PersonalData;