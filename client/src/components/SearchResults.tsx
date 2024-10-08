import { Result } from "../types/Result";
import { SearchResult } from "./SearchResult";

type SearchResultsProps = {
    results: Result[];
}

export const SearchResults = (props: SearchResultsProps) => {
    return (
        <>
            {props.results.map((result) => <SearchResult suburb={result.suburb} postcode={result.postcode} state={result.state}/>)}
        </>
    )
};