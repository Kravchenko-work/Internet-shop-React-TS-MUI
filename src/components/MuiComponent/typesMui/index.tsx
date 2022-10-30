import React from "react";
import {Control} from "react-hook-form";
import {IFormPersonalData} from "../../../types";

export interface IMuiInput {
    register: any
    error?: boolean
    helperText?: string | undefined
    label: string
    onInput?: (val:React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (val: React.FocusEvent<HTMLInputElement>) => void
    readOnly?: boolean
}

export interface IMuiPhone {
    control: Control<IFormPersonalData>
}

interface Ioption {
    value: string
    label: string
}

export interface IMuiSelect {
    options: Ioption[];
    register: any
    error?: boolean
    helperText?: string | undefined
    label: string
    onClose?: (val:React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (val: React.FocusEvent<HTMLSelectElement>) => void
    defaultValue: string
}