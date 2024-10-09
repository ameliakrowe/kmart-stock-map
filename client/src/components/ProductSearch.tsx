import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export const ProductSearch = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    return (
        <div className="stock-search">
            <SearchBar
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <IconButton color="primary" onClick={() => console.log("clicked")}>
                <SearchIcon />
            </IconButton>
        </div>   
    )
};