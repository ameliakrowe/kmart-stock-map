import TextField from "@mui/material/TextField";
import React from "react";

type SearchBarProps = {
    label: string;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export const SearchBar = (props: SearchBarProps) => {
    const { label, onInput, value } = props;
    return (
        <TextField
            className="Search-bar"
            id="outlined-basic"
            label={label}
            onInput={onInput}
            variant="outlined"
            value={value}
        />
    );
};
