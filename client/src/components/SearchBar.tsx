import TextField from "@mui/material/TextField";
import React from "react";

type SearchBarProps = {
    errorText?: string | null;
    label: string;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export const SearchBar = (props: SearchBarProps) => {
    const { errorText, label, onInput, value } = props;
    return (
        <TextField
            className="Search-bar"
            error={Boolean(errorText)}
            helperText={errorText}
            id="outlined-basic"
            label={label}
            onInput={onInput}
            variant="outlined"
            value={value}
        />
    );
};
