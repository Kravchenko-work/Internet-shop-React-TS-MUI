import React, {FC} from 'react';
import YandexMap from "./YandexMap/YandexMap";
import MuiInput from "../../../components/MuiComponent/MuiInput";

interface IAddress {
    useForm: any
}

const Address:FC<IAddress> = (
    {
        useForm: {
            registerAddress: register,
            handleSubmitAddress: handleSubmit,
            formState: { errorsAddress: errors },
            triggerAddress: trigger,
            getValuesAddress: getValues,
            setValueAddress: setAddress,
            setFocusAddress: setFocus,
            clearErrorsAddress: clearErrors
        },
    }
) => {
    return (
        <div>
            <YandexMap
                setValue={setAddress}
                setFocus={setFocus}
                clearErrors={clearErrors}
            />
            <MuiInput
                register={() => {return register("address", {
                    required: "Address is a required field!",
                })}}
                error={Boolean(errors.address)}
                helperText={errors?.address?.message}
                label="Address"
                readOnly={true}
            />
        </div>
    );
};

export default Address;