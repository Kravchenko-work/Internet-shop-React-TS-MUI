import React, {FC, useEffect, useRef, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box, Button, Chip, ClickAwayListener,
    FormControl, InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput, Popper, Select,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material/";
import {ICard} from "../types";
import {currentPrice} from "../utils";
import {SelectChangeEvent} from "@mui/material";

type IFilterSidebar = {
    setListCards: (val: ICard[]) => void
    cloneListCards: ICard[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const FilterSidebar:FC<IFilterSidebar> = ({setListCards, cloneListCards}) => {
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [brands, setBrands] = useState<string[]>([]);
    const [selectBrands, setSelectBrands] = useState<string[]>([]);
    const [openSearchPrice, setOpenSearchPrice] = useState<boolean>(false);
    const [openSearchBrand, setOpenSearchBrand] = useState<boolean>(false);
    const anchorRefPrice = useRef<HTMLDivElement>(null);
    const anchorRefBrand = useRef<HTMLDivElement>(null);

    const getFilteredListCard = () => {
        return (
            cloneListCards.filter((itemCard: ICard) => {
                return (
                    (
                        currentPrice(itemCard) > Number(minPrice) &&
                        (currentPrice(itemCard) < Number(maxPrice) || !maxPrice)
                    ) && (
                        selectBrands.includes(itemCard.brand) || !selectBrands.length
                    )

                )
            })
        )
    }

    const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value);
        setOpenSearchPrice(true);
    }
    const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value);
        setOpenSearchPrice(true);
    }
    const commonHandleKeyPressPrice = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setListCards(getFilteredListCard());
            setOpenSearchPrice(false);
        }
    }

    const handlerSearchByPrice = () => {
        setOpenSearchPrice(false);
        setListCards(getFilteredListCard());
    }
    const handlerSearchByBrand = () => {
        setOpenSearchBrand(false);
        setListCards(getFilteredListCard());
    }

    const handleClosePrice = (event: Event) => {
        if (
            anchorRefPrice.current &&
            anchorRefPrice.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpenSearchPrice(false);
    };
    const handleCloseBrand = (event: Event) => {
        if (
            anchorRefBrand.current &&
            anchorRefBrand.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpenSearchBrand(false);
    };

    const handleChangeBrand = (e: SelectChangeEvent<unknown>) => {
        let {
            target: { value },
        } = e;

        if (typeof value === 'string') {
            setSelectBrands(value.split(','));
        } else if (Array.isArray(value)) {
            setSelectBrands(value);
        }
        setOpenSearchPrice(true);
    };

    const handleClickBrand = (e: React.MouseEvent<HTMLElement>) => {
        setOpenSearchBrand(true);
    }

    useEffect(() => {
        let arr:string[] = [];
        for (let itemListCard of cloneListCards) {
            if (!arr.includes(itemListCard.brand)) {
                arr.push(itemListCard.brand)
            }
        }
        setBrands(arr);
    }, [cloneListCards])

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ClickAwayListener onClickAway={handleClosePrice}>
                        <div style={{display: 'flex'}} ref={anchorRefPrice}>
                            <FormControl  sx={{ mr: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Min price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={minPrice}
                                    onChange={handleChangeMinPrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    placeholder={'from 0'}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    onKeyPress={commonHandleKeyPressPrice}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-amount">Max price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={maxPrice}
                                    onChange={handleChangeMaxPrice}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    placeholder={'by 10000'}
                                    inputProps={{ style: { fontSize: 14 } }}
                                    onKeyPress={commonHandleKeyPressPrice}
                                />
                            </FormControl>
                            <Popper
                                open={openSearchPrice}
                                placement={'right'}
                                anchorEl={anchorRefPrice.current}
                            >
                                <Button variant="contained" onClick={handlerSearchByPrice}>Search</Button>
                            </Popper>
                        </div>
                    </ClickAwayListener>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ClickAwayListener onClickAway={handleCloseBrand}>
                        <FormControl sx={{ m: 1, width: '100%' }} >
                            <InputLabel id="demo-multiple-chip-label">List brands</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectBrands}
                                onChange={handleChangeBrand}
                                input={<OutlinedInput id="select-multiple-chip" label="List brands" />}
                                renderValue={(selected:string[] | string) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {Array.isArray(selected) && selected.map((value:string) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                onClick={handleClickBrand}
                                ref={anchorRefBrand}
                            >
                                {brands.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Popper
                                open={openSearchBrand}
                                placement={'right'}
                                anchorEl={anchorRefBrand.current}
                                sx={{
                                    zIndex: 10,
                                }}
                            >
                                <Button variant="contained" onClick={handlerSearchByBrand}>Search</Button>
                            </Popper>
                        </FormControl>
                    </ClickAwayListener>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FilterSidebar;