type SearchResultProps = {
    suburb: string,
    state: string,
    postcode: string
}

export const SearchResult = (props: SearchResultProps) => {
    const { suburb, state, postcode } = props;
    return (
        <p>{suburb + ", " + state + ", " + postcode}</p>
    )
};