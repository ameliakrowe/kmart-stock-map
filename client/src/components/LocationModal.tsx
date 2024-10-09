import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SearchArea } from './SearchArea';
import { Result } from '../types/Result';

type LocationModalProps = {
    isOpen: boolean
    onClose: () => void
    handleSearchResultClick: (suburb: Result) => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export const LocationModal = (props: LocationModalProps) => {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.onClose}
        >
            <Box sx={style}>
                <b>Select a location</b>
                <SearchArea handleSearchResultClick={props.handleSearchResultClick}/>
            </Box>
        </Modal>
    )
};