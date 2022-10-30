import React, {FC, useState} from 'react';
import {Box, Button, Container, Step, StepButton, Stepper, Typography} from "@mui/material";

import PersonalData from "./components/PersonalData";

import s from "./Order.module.scss"
import {IFormPersonalData, IFormCreditCard, IFormAddress} from "../../types";
import {useForm} from "react-hook-form";
import CreditCard from "./components/CreditCard/CreditCard";
import Address from "./components/Address";
import ConfirmOrder from "./components/ConfirmOrder";

const steps = ["Buyer's details", "Bank card details", "Delivery address"];

const Order:FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const { register, handleSubmit, formState: { errors }, control, getValues, trigger } = useForm<IFormPersonalData>({
        mode: "onChange"
    });
    const [_, setPersonalData] = useState<IFormPersonalData>({email: "", name: "", phone: ""});

    const {
        register: registerCreditCard,
        handleSubmit: handleSubmitCreditCard,
        formState: { errors: errorsCreditCard },
        control: controlCreditCard,
        getValues: getValuesCreditCard,
        setValue: setValueCreditCard,
        trigger:triggerCreditCard,
        watch: watchCreditCard,
    } = useForm<IFormCreditCard>({
        mode: "onChange"
    });

    const [__, setCreditCard] = useState<IFormCreditCard>({
        cvc: "",
        expiry: "",
        expiryyear: "",
        name: "",
        number: ""
    });

    const {
        register: registerAddress,
        handleSubmit: handleSubmitAddress,
        formState: { errors: errorsAddress },
        trigger:triggerAddress,
        getValues: getValuesAddress,
        setValue :setValueAddress,
        setFocus: setFocusAddress,
        clearErrors: clearErrorsAddress
    } = useForm<IFormAddress>({
        mode: "onChange"
    });
    const [___, setAddress] = useState<IFormAddress>({
        address: ""
    });



    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        switch(activeStep) {
            case 0:
                trigger();
                handleSubmit(() => {
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    handleNext();
                    setPersonalData({...getValues()});
                })()
                return;
            case 1:
                triggerCreditCard();
                handleSubmitCreditCard(() => {
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    handleNext();
                    setCreditCard({...getValuesCreditCard()});
                })()
                return;
            case 2:
                triggerAddress();
                handleSubmitAddress(() => {
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    handleNext();
                    setAddress({...getValuesAddress()});
                })()
                return
            default:
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Container>
            <h1 className={s.title}>
                Making an order
            </h1>
            <Box sx={{ width: '100%', paddingTop: '40px' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Change data
                                </Button>
                            </Box>
                            <ConfirmOrder/>
                        </>
                    ) : (
                        <>
                            <Box>
                                { activeStep === 0 &&
                                    <PersonalData
                                        useForm={{ register, handleSubmit, formState: { errors }, control }}
                                    /> }

                                { activeStep === 1 &&
                                    <CreditCard
                                        useForm={{
                                            registerCreditCard,
                                            handleSubmitCreditCard,
                                            formState: { errorsCreditCard },
                                            controlCreditCard,
                                            getValuesCreditCard,
                                            triggerCreditCard,
                                            setValueCreditCard,
                                            watchCreditCard,
                                        }}
                                    />
                                }
                                { activeStep === 2 &&
                                    <Address
                                        useForm={{
                                            registerAddress,
                                            handleSubmitAddress,
                                            formState: { errorsAddress },
                                            triggerAddress,
                                            getValuesAddress,
                                            setValueAddress,
                                            setFocusAddress,
                                            clearErrorsAddress,
                                        }}
                                    />
                                }
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                                ? 'Finish'
                                                : 'Complete Step'}
                                        </Button>
                                    ))}
                            </Box>
                        </>
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default Order;