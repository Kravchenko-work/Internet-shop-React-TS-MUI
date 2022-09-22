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
