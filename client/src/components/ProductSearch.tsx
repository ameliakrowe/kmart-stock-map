import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios';

const requestUrl = "/api/getProductAvailability";

export const ProductSearch = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const fetchProductAvailability = async (productID: string) => {        
        try {
            const response = await axios.get(requestUrl, {
                params: {
                    productSKU: productID,
                    postcode: "2000"
                }
            });
            console.log(response);
        } catch (err) {
            console.log("error");
        }
    };

    return (
        <div className="stock-search">
            <SearchBar
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <IconButton color="primary" onClick={() => fetchProductAvailability(searchInput)}>
                <SearchIcon />
            </IconButton>
        </div>   
    )
};