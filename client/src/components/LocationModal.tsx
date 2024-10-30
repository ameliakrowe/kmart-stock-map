import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SearchArea } from "./SearchArea";
import { Result } from "../types/Result";
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
    return (
        <Modal open={props.isOpen} onClose={props.onClose}>
            <Box sx={style}>
                <p className="location-select-text">Select a location</p>
                <SearchArea
                    handleSearchResultClick={props.handleSearchResultClick}
                />
            </Box>
        </Modal>
    );
};
