import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';

import { useEffect, useState } from 'react';
import axios from 'axios';

const requestUrl = "/api";
const graphqlQuery = "";

export const SearchArea = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchInput.length < 3) {
                setSearchResults([]);
                return;
            }
            
            try {
                const response = await axios.get(requestUrl);
                console.log(response);
                setSearchResults(response.data.list);
            } catch (err) {
                console.log(err);
                setSearchResults(["error"]);
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
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <SearchResults results={searchResults}/>
        </>        
    )
};