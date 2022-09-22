import React, {FC, useState} from 'react';
import {
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    Button, Popper,
    Box, ClickAwayListener
} from "@mui/material";

import {currentPrice} from "../utils";

import {ICard} from "../types";

type ISortingCard = {
    useListCard: [
        listCard: ICard[],
        setListCard: (val: ICard[]) => void
    ],
}


const SortingCard:FC<ISortingCard> = ({useListCard}) => {
    const [open, setOpen] = React.useState(false);
    const [radio, setRadio] = useState('Default');

    const anchorRef = React.useRef<HTMLDivElement>(null);

    const [listCard, setListCard] = useListCard;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setOpen((prev) => !prev);
    }

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadio(e.target.value);
        setOpen(false);
        let copyForSetListCard:ICard[] = Object.assign([], listCard);
        switch (e.target.value) {
            case 'Alphabetically':
                copyForSetListCard.sort((itemListCardX: ICard, itemListCardY: ICard) =>  itemListCardX.title.localeCompare(itemListCardY.title));
                setListCard(copyForSetListCard);
                return;
            case 'Reverse Alphabetically':
                copyForSetListCard.sort((itemListCardX: ICard, itemListCardY: ICard) =>  itemListCardX.title.localeCompare(itemListCardY.title));
                copyForSetListCard.reverse();
                setListCard(copyForSetListCard);
                return;
            case 'Ascending Price':
                copyForSetListCard.sort((itemListCardX: ICard, itemListCardY: ICard) =>  currentPrice(itemListCardX) - currentPrice(itemListCardY));
                setListCard(copyForSetListCard);
                return;
            case 'Descending Price':
                copyForSetListCard.sort((itemListCardX: ICard, itemListCardY: ICard) =>  currentPrice(itemListCardX) - currentPrice(itemListCardY));
                copyForSetListCard.reverse();
                setListCard(copyForSetListCard);
                return;
            case 'Default':
                copyForSetListCard.sort((itemListCardX: ICard, itemListCardY: ICard) =>  itemListCardX.id - itemListCardY.id);
                setListCard(copyForSetListCard);
                return;
            default:
                return;
        }
    }

    return (
        <div ref={anchorRef}>
            <FormLabel id="demo-radio-buttons-group-label">
                Sorting by
            </FormLabel>
            <Button  variant="text" onClick={handleClick}>{radio}</Button>
            <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-start'}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={handleChangeRadio}
                            defaultValue="Default"
                            value={radio}
                        >
                            <FormControlLabel value="Default" control={<Radio size="small"/>} label="Default" />
                            <FormControlLabel value="Alphabetically" control={<Radio size="small"/>} label="Alphabetically" />
                            <FormControlLabel value="Reverse Alphabetically" control={<Radio size="small"/>} label="Reverse alphabetically" />
                            <FormControlLabel value="Ascending Price" control={<Radio size="small"/>} label="Ascending price" />
                            <FormControlLabel value="Descending Price" control={<Radio size="small"/>} label="Descending price" />
                        </RadioGroup>
                    </Box>
                </ClickAwayListener>
            </Popper>
            <span>
                (without request for API)
            </span>
        </div>

    );
};

export default SortingCard;