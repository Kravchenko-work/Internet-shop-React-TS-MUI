import React, {FC} from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import NavBar from "./components/NavBar/NavBar";

const App:FC = () => {

    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Routes></Routes>
        </BrowserRouter>
    );
}

export default App;
