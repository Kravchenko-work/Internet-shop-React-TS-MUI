import React, {FC} from 'react';
import {Theme} from "@mui/material";
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles((theme:Theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
}));

type typeForm = {
    children: React.ReactNode;
};

const Form:FC<typeForm> = ({children, ...props}) => {
    const styles = useStyles();

    return (
        <form {...props} className={styles.root} noValidate>
            {children}
        </form>
    );
};

export default Form;