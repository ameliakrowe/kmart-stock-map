import { Result } from "../types/Result";
import { SearchResult } from "./SearchResult";
import List from "@mui/material/List";

type SearchResultsProps = {
    results: Result[];
}

export const SearchResults = (props: SearchResultsProps) => {
    return (
        <List>
            {props.results.map((result) => <SearchResult suburb={result.suburb} postcode={result.postcode} state={result.state}/>)}
        </List>
    )
};