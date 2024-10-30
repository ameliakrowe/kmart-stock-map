import { Result } from "../types/Result";
import { SearchResult } from "./SearchResult";
import List from "@mui/material/List";
import React, { useState } from "react";

type SearchResultsProps = {
    results: Result[];
    handleSearchResultClick: (suburb: Result) => void;
};

export const SearchResults = (props: SearchResultsProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    return (
        <List>
            {props.results.map((result, index) => (
                <SearchResult
                    index={index}
                    isSelected={selectedIndex === index}
                    key={result.postcode}
                    suburbResult={result}
                    onClick={(index: number, suburb: Result) => {
                        setSelectedIndex(index);
                        props.handleSearchResultClick(suburb);
                    }}
                />
            ))}
        </List>
    );
};
