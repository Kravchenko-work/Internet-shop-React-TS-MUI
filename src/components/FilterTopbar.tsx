import React, {FC, useContext, useEffect, useState} from 'react';
import useFetch from "../hooks/useFetch";
import MuiButtonGroup from "./MuiComponent/MuiButtonGroup";
import clsx from "clsx";

import s from "../index.module.scss";
import {TextField} from "@mui/material";
import ContextSearchUrl from "../contexts/SearchUrl";

const FilterTopbar:FC = () => {
    const [categories, setCategories] = useState<string[]>(['All categories']);
    const [search, setSearch] = useState('');

    const [{response}, doFetch] = useFetch('/categories');
    const [_, setUrl] = useContext(ContextSearchUrl);

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const timeout = setTimeout(() => setUrl(`/search?q=${e.target.value}`), 1200);
        return () => clearTimeout(timeout);
    }

    const handleKeyPressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setUrl(`/search?q=${search}`)
        }
    }

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (!response) {
            return
        }

        setCategories(['All categories', ...response]);
    }, [response])

    return (
        <div className={clsx(s.sector, s.marginH)}>
            <div className={s.flex}>
                <MuiButtonGroup listCategory={categories}></MuiButtonGroup>
            </div>
            <TextField
                label="Searck keywords"
                type="Search"
                id="outlined-search"
                onChange={handleChangeSearch}
                value={search}
                fullWidth
                onKeyPress={handleKeyPressSearch}
            />
        </div>
    );
};

export default FilterTopbar;