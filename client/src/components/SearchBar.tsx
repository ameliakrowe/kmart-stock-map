import TextField from "@mui/material/TextField";
import React from "react";

type SearchBarProps = {
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export const SearchBar = (props: SearchBarProps) => {
    return (
        <TextField
            className="Search-bar"
            id="outlined-basic"
            label="Enter product SKU (8 digits)"
            onInput={props.onInput}
            variant="outlined"
            value={props.value}
        />
    );
};
