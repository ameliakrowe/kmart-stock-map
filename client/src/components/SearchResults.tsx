import { Result } from "../types/Result";
import { SearchResult } from "./SearchResult";
import List from "@mui/material/List";
import React from 'react';

type SearchResultsProps = {
    results: Result[];
    handleSearchResultClick: (suburb: Result) => void
}

export const SearchResults = (props: SearchResultsProps) => {
    return (
        <List>
            {props.results.map((result) => <SearchResult key={result.postcode} suburbResult={result} onClick={(suburb: Result) => props.handleSearchResultClick(suburb)}/>)}
        </List>
    )
};