import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type SearchResultProps = {
    suburb: string,
    state: string,
    postcode: string
}

export const SearchResult = (props: SearchResultProps) => {
    const { suburb, state, postcode } = props;
    return (
        <ListItemButton>
            <ListItemText primary={suburb + ", " + state + ", " + postcode} />
        </ListItemButton>
    )
};