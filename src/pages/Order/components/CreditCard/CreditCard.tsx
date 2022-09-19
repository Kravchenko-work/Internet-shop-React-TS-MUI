import React, {FC, FormEvent, useState} from 'react';
import Cards, {Focused} from 'react-credit-cards';
import "./form-style.css";
import './CreditCard.css';
import MuiInput from "../../../../components/MuiComponent/MuiInput";
import MuiSelect from "../../../../components/MuiComponent/MuiSelect";

interface IstateCreditCard {
    cvc: string
    expiry: string
    focused: Focused
    name: string
    number: string
    expiryyear: string
}

interface ICreditCard {
    useForm: any
}

const normalizeCardNumber = (val:string) => {
    let returnVal = val.replace(/[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g, "") ;

    if (returnVal.length === 4 || returnVal.length === 9 || returnVal.length === 14) {
        return  returnVal.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ")
    } else {
        return returnVal.slice(0, 19);
    }
}

const normalizeCardName = (val:string) => {
    return val.replace(
        /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
        ""
    ).slice(0,20);
}

const normalizeCardCvc = (val:string) => {
    let returnVal = val.replace(/[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g, "") ;

    let invalidChars = ["-", "+", "e", "E", " ", "."];


    return returnVal.replace(/[-+eE\.\s]/, "").slice(0,4);
}

const optionsExpiry = [
    {
        value: "month",
        label: "Month",
    },
    {
        value: "01",
        label: "01",
    },
    {
        value: "02",
        label: "02",
    },
    {
        value: "03",
        label: "03",
    },
    {
        value: "04",
        label: "04",
    },
    {
        value: "05",
        label: "05",
    },
    {
        value: "06",
        label: "06",
    },
    {
        value: "07",
        label: "07",
    },
    {
        value: "08",
        label: "08",
    },
    {
        value: "09",
        label: "09",
    },
    {
        value: "10",
        label: "10",
    },
    {
        value: "11",
        label: "11",
    },
    {
        value: "12",
        label: "12",
    },
];

const optionsExpiryyear = [
    {
        value: "years",
        label: "Years",
    },
    {
        value: "2020",
        label: "2020",
    },
    {
        value: "2021",
        label: "2021",
    },
    {
        value: "2022",
        label: "2023",
    },
    {
        value: "2024",
        label: "2024",
    },
    {
        value: "2025",
        label: "2025",
    },
    {
        value: "2026",
        label: "2026",
    },
    {
        value: "2027",
        label: "2027",
    },
    {
        value: "2028",
        label: "2028",
    },
    {
        value: "2029",
        label: "2029",
    },
    {
        value: "2030",
        label: "2030",
    },
]

const CreditCard:FC<ICreditCard> = (
    {
        useForm: {
            registerCreditCard: register,
            handleSubmitCreditCard: handleSubmit,
            formState: { errorsCreditCard: errors },
            controlCreditCard: control,
            getValuesCreditCard: getValues,
            triggerCreditCard: trigger,
            setValueCreditCard: setValue,
            watchCreditCard: watch
        }
    }
) => {
    const [stateCreditCard, setStateCreditCard] = useState<IstateCreditCard>({
        cvc: '',
        expiry: "",
        focused: "name",
        name: "",
        number: "",
        expiryyear: ""
    });

    const removeSpecial = (e: React.KeyboardEvent<HTMLElement>) => {
        let invalidChars = ["-", "+", "e", "E", " ", "."];
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handlerChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateCreditCard({
            ...stateCreditCard,
            number: e.target.value.replace(/[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g, "")
        });
    }

    const handlerChangeCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, maxLength } = e.target;
        setStateCreditCard({
            ...stateCreditCard,
            cvc: value.length > maxLength ? value.slice(0, maxLength) : value,
        });
    };

    const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateCreditCard({
            ...stateCreditCard,
            name: e.target.value.replace(
                /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
                ""
            )
        });
    }

    const handlerChangeExpiryyear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStateCreditCard({
            ...stateCreditCard,
            expiryyear: e.target.value
        });
    }

    const handlerChangeExpiry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStateCreditCard({
            ...stateCreditCard,
            expiry: e.target.value
        });
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        setStateCreditCard({
            ...stateCreditCard,
            focused: e.target.name as Focused
        });
    };

    console.log('getValues', getValues());
    console.log('errors', errors);

    React.useEffect(() => {

        console.log(watch);
        // const subscription = watch((value, { name, type }) => console.log(value, name, type));
        // return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <div id="PaymentForm">
            <div className="credit-card ">
                <Cards
                    cvc={stateCreditCard.cvc}
                    expiry={stateCreditCard.expiry}
                    focused={stateCreditCard.focused}
                    name={stateCreditCard.name}
                    number={stateCreditCard.number}
                />
            </div>
            <div className="card">
                <form className="payment-form">
                    <MuiInput
                        register={() => {return register("number", {
                            required: "Number card is a required field!",
                            minLength: {
                                value: 19,
                                message: "Number card may be has 16 numbers"
                            }
                        })}}
                        onInput={(e) => {
                            setValue(
                                "number",
                                normalizeCardNumber(e.target.value)
                            )
                        }}
                        onFocus={handleInputFocus}
                        error={Boolean(errors.number)}
                        helperText={errors?.number?.message}
                        label="Card number"
                    />
                    <MuiInput
                        register={() => {return register("name", {
                            required: "Name card is a required field!",
                        })}}
                        onInput={(e) => {
                            setValue(
                                "name",
                                normalizeCardName(e.target.value)
                            )
                        }}
                        onFocus={handleInputFocus}
                        error={Boolean(errors.name)}
                        helperText={errors?.name?.message}
                        label="Card holder"
                    />
                   <div className="select__wrapper">
                       <MuiSelect
                           register={() => {return register("expiry", {
                               required: "Expiry is required",
                               maxLength: {
                                   value: 2,
                                   message: 'Expiry is required!'
                               }
                           })}}
                           options={optionsExpiry}
                           defaultValue="month"
                           onFocus={handleInputFocus}
                           error={Boolean(errors.expiry)}
                           helperText={errors?.expiry?.message}
                           label="Expiry"
                       />
                       <MuiSelect
                           register={() => {return register("expiryyear", {
                               required: "Expiryyear is required",
                               maxLength: {
                                   value: 4,
                                   message: 'Expiryyear is required!'
                               }
                           })}}
                           options={optionsExpiryyear}
                           defaultValue="years"
                           onFocus={handleInputFocus}
                           error={Boolean(errors.expiryyear)}
                           helperText={errors?.expiryyear?.message}
                           label="Expiryyear"
                       />
                   </div>
                    <MuiInput
                        register={() => {return register("cvc", {
                            required: "CVC card is a required field!",
                            minLength: {
                                value: 4,
                                message: "CVC should have correct format"
                            }
                        })}}
                        onInput={(e) => {
                            setValue(
                                "cvc",
                                normalizeCardCvc(e.target.value)
                            )
                        }}
                        onFocus={handleInputFocus}
                        error={Boolean(errors.cvc)}
                        helperText={errors?.cvc?.message}
                        label="CVC"
                    />
                    <div className="date-cvv-box">
                        <div className="expiry-class">
                            <div className="card-month ">

                            </div>
                            <div className="card-year">

                            </div>
                        </div>

                        <div className="cvv-class">

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreditCard;