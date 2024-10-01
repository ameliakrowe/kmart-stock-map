type SearchResultProps = {
    results: string[];
}

export const SearchResults = (props: SearchResultProps) => {
    return (
        <ul>
            {props.results.map((result) => <li>{result}</li>)}
        </ul>
    )
};