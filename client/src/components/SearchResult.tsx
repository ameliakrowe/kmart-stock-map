import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Result } from "../types/Result";
import React from "react";

type SearchResultProps = {
    index: number;
    isSelected: boolean;
    suburbResult: Result;
    onClick: (index: number, suburb: Result) => void;
};

export const SearchResult = (props: SearchResultProps) => {
    const { index, isSelected, suburbResult, onClick } = props;
    const handleClick = () => {
        onClick(index, suburbResult);
    };
    const { suburb, state, postcode } = suburbResult;
    return (
        <ListItemButton onClick={handleClick} selected={isSelected}>
            <ListItemText primary={suburb + ", " + state + ", " + postcode} />
        </ListItemButton>
    );
};
