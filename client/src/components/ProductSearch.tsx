import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios';
import { StockLocation } from "../types/StockLocation";
import { Result } from '../types/Result';

const availabilityRequestUrl = "/api/getProductAvailability";

type ProductSearchProps = {
    currentLocation: Result,
    onProductAvailabilityFetched: (locations: StockLocation[]) => void
}

export const ProductSearch = (props: ProductSearchProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const {currentLocation, onProductAvailabilityFetched} = props;

    const fetchProductAvailability = async (productID: string) => {        
        try {
            const response = await axios.get(availabilityRequestUrl, {
                params: {
                    productSKU: productID,
                    postcode: currentLocation.postcode,
                    lat: currentLocation.location.lat,
                    lon: currentLocation.location.lon
                }
            });
            console.log(response);
            onProductAvailabilityFetched(response.data.clickAndCollect.map((item: any) => item as StockLocation))
        } catch (err) {
            console.log(err);
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