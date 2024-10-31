/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SearchBar } from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { StockLocation } from "../types/StockLocation";
import { Result } from "../types/Result";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import { ProductAvailabilityResponse } from "../types/ProductAvailabilityResponse";
import { ClickAndCollectLocation } from "../types/ClickAndCollectLocation";
import { InStoreLocation } from "../types/InStoreLocation";
import { ProductAvailabilityError } from "../types/ProductAvailabilityError";

const availabilityRequestUrl = "/api/getProductAvailability";

type ProductSearchProps = {
    currentLocation: Result;
    onProductAvailabilityFetched: (locations: StockLocation[]) => void;
    onSearchError: (error: string) => void;
    onSearchStarted: () => void;
    onSearchFinished: () => void;
    searchRadius: number;
    isSearchPending: boolean;
};

export const ProductSearch = (props: ProductSearchProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const isInputValid = !validationError && searchInput.length !== 0;

    const {
        currentLocation,
        onProductAvailabilityFetched,
        searchRadius,
        isSearchPending,
        onSearchError,
        onSearchStarted,
        onSearchFinished,
    } = props;

    const combineCandCAndInStoreInfo = (data: ProductAvailabilityResponse) => {
        const result: StockLocation[] = [];
        data.clickAndCollect.forEach(
            (cAndCLocation: ClickAndCollectLocation) => {
                const matchingInStoreLocations = data.inStore.filter(
                    (inStoreLocation: InStoreLocation) =>
                        cAndCLocation.locationId ===
                        inStoreLocation.locationId.toString(),
                );
                console.log(matchingInStoreLocations);
                result.push(
                    matchingInStoreLocations.length > 0
                        ? {
                              ...cAndCLocation,
                              inStoreStockLevel:
                                  matchingInStoreLocations[0].stockLevel,
                          }
                        : cAndCLocation,
                );
            },
        );
        return result;
    };

    const fetchProductAvailability = async (productID: string) => {
        try {
            onSearchStarted();
            const response = await axios.get(availabilityRequestUrl, {
                params: {
                    productSKU: productID,
                    postcode: currentLocation.postcode,
                    lat: currentLocation.location.lat,
                    lon: currentLocation.location.lon,
                    searchRadius,
                },
            });
            onProductAvailabilityFetched(
                combineCandCAndInStoreInfo(response.data),
            );
        } catch (err) {
            const axiosError = err as AxiosError;
            console.log(axiosError);
            if (axiosError.response) {
                const productError = axiosError.response
                    .data as ProductAvailabilityError;
                console.log(productError);
                onSearchError(productError.message);
            } else {
                onSearchError("Unknown error occurred fetching data");
            }
        }
        onSearchFinished();
    };

    const isOnlyDigits = (input: string) => {
        const regex = /^\d+$/;
        return regex.test(input);
    };

    const validateInput = (value: string) => {
        if (value.length !== 8) {
            return "Input must be 8 characters";
        } else if (!isOnlyDigits(value)) {
            return "Input must only contain numbers";
        }
        return null;
    };

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = e.target;
        setSearchInput(value);
        setValidationError(validateInput(value));
    };

    return (
        <div className="stock-search">
            <SearchBar
                errorText={validationError}
                label={"Enter product SKU (8 digits)"}
                onInput={handleSearchInputChange}
                value={searchInput}
            />
            <div className="clear-button">
                <IconButton onClick={() => setSearchInput("")}>
                    <ClearIcon />
                </IconButton>
            </div>
            {isSearchPending ? (
                <div className="progress-spinner">
                    <CircularProgress size="20px" />
                </div>
            ) : (
                <IconButton
                    color="primary"
                    disabled={!isInputValid}
                    onClick={() => fetchProductAvailability(searchInput)}
                >
                    <SearchIcon />
                </IconButton>
            )}
        </div>
    );
};
