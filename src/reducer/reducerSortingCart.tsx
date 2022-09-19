import {createContext, useReducer} from "react";
import React from "react";
import {ICard} from "../types";

const initialState = {
    isLoading: false,
    isLoggedIn: null,
    currentUser: null,
}



const reducer = (state: ICard[], action:{type:string}) => {
    switch (action.type) {
        case 'alphabetically':
            state.sort()
            return {};
        case 'reverseAlphabetically':
            return {};
        case 'Ascending price':
            return {};
        case 'Descending price':
            return {};
        default:
            return state;
    }
}

export default reducer;