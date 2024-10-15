import { SearchBar } from "./SearchBar"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import axios from 'axios';
import { StockLocation } from "../types/StockLocation";
import { Result } from '../types/Result';
import { ProductAvailabilityResponse } from "../types/ProductAvailabilityResponse";
import { ClickAndCollectLocation } from "../types/ClickAndCollectLocation";
import { InStoreLocation } from "../types/InStoreLocation";

const availabilityRequestUrl = "/api/getProductAvailability";

type ProductSearchProps = {
    currentLocation: Result,
    onProductAvailabilityFetched: (locations: StockLocation[]) => void
}

export const ProductSearch = (props: ProductSearchProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const {currentLocation, onProductAvailabilityFetched} = props;

    const combineCandCAndInStoreInfo = (data: ProductAvailabilityResponse) => {
        console.log(JSON.stringify(data));
        const result: StockLocation[] = [];
        data.clickAndCollect.forEach((cAndCLocation: ClickAndCollectLocation) => {
            const matchingInStoreLocations = data.inStore.filter((inStoreLocation: InStoreLocation) => cAndCLocation.locationId == inStoreLocation.locationId.toString());
            console.log(matchingInStoreLocations);
            result.push(matchingInStoreLocations.length > 0 ? {...cAndCLocation, inStoreStockLevel: matchingInStoreLocations[0].stockLevel} : cAndCLocation);
        })
        console.log(result);
        return result;
    }

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
            //console.log(response);
            onProductAvailabilityFetched(combineCandCAndInStoreInfo(response.data))
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