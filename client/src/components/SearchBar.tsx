import TextField from "@mui/material/TextField";

type SearchBarProps = {
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const SearchBar = (props: SearchBarProps) => {
    return (
        <TextField
            className="Search-bar"
            id="outlined-basic"
            onInput={props.onInput}
            variant="outlined"
            value={props.value}
        />
    )
};