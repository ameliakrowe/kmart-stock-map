type SearchResultProps = {
    results: string;
}

export const SearchResults = (props: SearchResultProps) => {
    return (
        <p>{props.results}</p>
    )
};