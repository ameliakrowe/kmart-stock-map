import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SearchArea } from "./SearchArea";
import { Result } from "../types/Result";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React from "react";

type LocationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleSearchResultClick: (suburb: Result) => void;
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "12px",
    paddingBottom: "12px",
};

export const LocationModal = (props: LocationModalProps) => {
    const { isOpen, onClose, handleSearchResultClick } = props;
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <div className="location-modal-top-bar">
                    <p className="location-select-text">Select a location</p>
                    <div className="location-modal-close-button">
                        <IconButton onClick={onClose}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                </div>
                <SearchArea handleSearchResultClick={handleSearchResultClick} />
            </Box>
        </Modal>
    );
};
