import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import {  useNavigate } from "react-router-dom";
import { CryptoState } from '../Cryptocontext';

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));
const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
});

export const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();
  
    console.log(currency);


    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            variant="h6"
                            className={classes.title}>Crypto Seeker</Typography>
                        <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            style={{ width: 100, height: 40, marginLeft: 15 }}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                        
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>



            </AppBar>
        </ThemeProvider>
        
    )
  
}
