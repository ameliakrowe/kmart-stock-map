import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Result } from "../types/Result";
import React from 'react';

type SearchResultProps = {
    suburbResult: Result,
    onClick: (suburb: Result) => void
}

export const SearchResult = (props: SearchResultProps) => {
    const handleClick = () => {
        props.onClick(props.suburbResult);
    }
    const { suburb, state, postcode } = props.suburbResult;
    return (
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={suburb + ", " + state + ", " + postcode} />
        </ListItemButton>
    )
};