import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { LocationSearchError } from "./LocationSearchError";
import { Result } from "../types/Result";

import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const requestUrl = `${apiUrl}/api/getPostcodeSuggestions`;

type LocationSearchAreaProps = {
    onSearchResultClick: (suburb: Result) => void;
};

export const LocationSearchArea = (props: LocationSearchAreaProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Result[]>([]);
    const [searchError, setSearchError] = useState<string | null>(null);
    const { onSearchResultClick } = props;

    useEffect(() => {
        const fetchData = async () => {
            setSearchError(null);

            if (searchInput.length < 3) {
                setSearchResults([]);
                return;
            }

            try {
                const response = await axios.get(requestUrl, {
                    params: {
                        query: searchInput,
                    },
                });
                const newResults = response.data.data.postcodeQuery as Result[];
                setSearchResults(response.data.data.postcodeQuery as Result[]);
                if (newResults.length < 1) {
                    setSearchError("No suburbs found. Please try again.");
                }
            } catch (err) {
                console.log(err);
                setSearchError("Something went wrong. Please try again.");
                setSearchResults([]);
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(debounceFetch);
    }, [searchInput]);

    return (
        <>
            <SearchBar
                label={"Enter suburb or postcode"}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                }
                value={searchInput}
            />
            {searchError ? (
                <LocationSearchError message={searchError} />
            ) : (
                <SearchResults
                    results={searchResults}
                    handleSearchResultClick={(suburb: Result) =>
                        onSearchResultClick(suburb)
                    }
                />
            )}
        </>
    );
};
