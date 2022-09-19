import React, {FC} from "react";
import {createContext} from "react";

type typeSearchUrlContext = [
    string,
    (url: string) => void
]

const ContextSearchUrl = createContext<typeSearchUrlContext>([
    '',
    () => {}
]);

export default ContextSearchUrl;



// export const SearchUrlProvider:FC<> = ({children}) => {
//     const value = useReducer(reducer, initialState);
//
//     return (
//         <CurrentUserContext.Provider value={value}>
//             {children}
//             </CurrentUserContext.Provider>
//     )
// }