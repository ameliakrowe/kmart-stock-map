/* eslint-disable @typescript-eslint/no-unused-expressions */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SearchArea } from "./SearchArea";
import { Result } from "../types/Result";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

type LocationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSetLocation: (suburb: Result) => void;
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

const SetLocationButton = styled(Button)({
    backgroundColor: "#1994d1",
    borderRadius: 0,
    textTransform: "none",
    width: "200px",
    height: "50px",
    fontSize: 16,
});

export const LocationModal = (props: LocationModalProps) => {
    const [selectedResult, setSelectedResult] = useState<Result | undefined>(
        undefined,
    );
    const { isOpen, onClose, onSetLocation } = props;

    const handleButtonClick = () => {
        selectedResult && onSetLocation(selectedResult);
        onClose();
    };

    useEffect(() => {
        !isOpen && setSelectedResult(undefined);
    }, [isOpen]);

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
                <SearchArea onSearchResultClick={setSelectedResult} />
                <div className="location-modal-set-button-area">
                    <SetLocationButton
                        disabled={!selectedResult}
                        onClick={handleButtonClick}
                        variant="contained"
                    >
                        Set as my location
                    </SetLocationButton>
                </div>
            </Box>
        </Modal>
    );
};
