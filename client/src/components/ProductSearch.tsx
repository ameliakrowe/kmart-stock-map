import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import axios from 'axios';
import { StockLocation } from "../types/StockLocation";
import { Result } from '../types/Result';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductAvailabilityResponse } from "../types/ProductAvailabilityResponse";
import { ClickAndCollectLocation } from "../types/ClickAndCollectLocation";
import { InStoreLocation } from "../types/InStoreLocation";

const availabilityRequestUrl = "/api/getProductAvailability";

type ProductSearchProps = {
    currentLocation: Result,
    onProductAvailabilityFetched: (locations: StockLocation[]) => void,
    onSearchStarted: () => void,
    onSearchFinished: () => void,
    searchRadius: number,
    isSearchPending: boolean
}

export const ProductSearch = (props: ProductSearchProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const {currentLocation, onProductAvailabilityFetched, searchRadius, isSearchPending, onSearchStarted, onSearchFinished} = props;

    const combineCandCAndInStoreInfo = (data: ProductAvailabilityResponse) => {
        console.log(JSON.stringify(data));
        const result: StockLocation[] = [];
        data.clickAndCollect.forEach((cAndCLocation: ClickAndCollectLocation) => {
            const matchingInStoreLocations = data.inStore.filter((inStoreLocation: InStoreLocation) => cAndCLocation.locationId == inStoreLocation.locationId.toString());
            console.log(matchingInStoreLocations);
            result.push(matchingInStoreLocations.length > 0 ? {...cAndCLocation, inStoreStockLevel: matchingInStoreLocations[0].stockLevel} : cAndCLocation);
        })
        return result;
    }

    const fetchProductAvailability = async (productID: string) => {        
        try {
            onSearchStarted();
            const response = await axios.get(availabilityRequestUrl, {
                params: {
                    productSKU: productID,
                    postcode: currentLocation.postcode,
                    lat: currentLocation.location.lat,
                    lon: currentLocation.location.lon,
                    searchRadius
                }
            });
            onProductAvailabilityFetched(combineCandCAndInStoreInfo(response.data))
        } catch (err) {
            console.log(err);
        }
        onSearchFinished();
    };

    return (
        <div className="stock-search">
            <SearchBar
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            {isSearchPending ? <div className="progress-spinner"><CircularProgress size="20px"/></div>
            : <IconButton color="primary" onClick={() => fetchProductAvailability(searchInput)}><SearchIcon /></IconButton>}
        </div>   
    )
};