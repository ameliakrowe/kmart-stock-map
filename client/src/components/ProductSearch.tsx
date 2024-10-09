import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type ProductSearchProps = {
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const ProductSearch = (props: ProductSearchProps) => {
    return (
        <div className="stock-search">
            <SearchBar
                onInput={props.handleInput}
                value={props.value}
            />
            <IconButton color="primary" onClick={() => console.log("clicked")}>
                <SearchIcon />
            </IconButton>
        </div>   
    )
};