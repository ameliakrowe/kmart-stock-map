import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { Result } from "../types/Result";

import React, { useEffect, useState } from "react";
import axios from "axios";

const requestUrl = "/api/getPostcodeSuggestions";

type SearchAreaProps = {
    handleSearchResultClick: (suburb: Result) => void;
};

export const SearchArea = (props: SearchAreaProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Result[]>([]);

    useEffect(() => {
        const fetchData = async () => {
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
                setSearchResults(response.data.data.postcodeQuery as Result[]);
            } catch (err) {
                console.log(err);
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
            <SearchResults
                results={searchResults}
                handleSearchResultClick={(suburb: Result) =>
                    props.handleSearchResultClick(suburb)
                }
            />
        </>
    );
};
