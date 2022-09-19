import React from 'react';
import {
    AppBar,
    Box,
    IconButton,
    ThemeProvider,
    createTheme,
    Toolbar,
    Container
} from '@mui/material';
import {NavLink} from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import s from "./NavBar.module.scss"
import {styled} from "@mui/material/styles";
import Badge, {BadgeProps} from "@mui/material/Badge";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        border: `2px solid ${theme.palette.background.paper}`,
    },
}));

function AppBarLabel<FC>(label: string) {
    return (
        <Container>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <NavLink
                        to="/"
                        className={s.link}
                        style={({isActive}) => ({color: isActive ? '#fff' : '#1976d2'})}
                    >
                        <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        SHOP
                    </NavLink>
                    <NavLink
                        to='/cart'
                        className={s.link}
                        style={({isActive}) => ({color: isActive ? '#fff' : '#1976d2'})}
                    >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            CART
                        </div>
                        <IconButton aria-label="cart">
                            <StyledBadge color="primary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </NavLink>
                </Box>
            </Toolbar>

        </Container>
    );
}

export default () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary">
                    {AppBarLabel('default')}
                </AppBar>
            </ThemeProvider>
        </Box>
    );
};

