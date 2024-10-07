type LocationBannerProps = {
    selectedLocation: string,
    handleOpenModal: () => void
}

export const LocationBanner = (props: LocationBannerProps) => {
    return (
        <div className="location-banner">
            {props.selectedLocation.length < 1 && (
                <a href="#" className="location-select" onClick={props.handleOpenModal}>Select a location</a>
            )}
            {props.selectedLocation.length >= 1 && (
                <p>Showing availability for <a href="#" className="location-select" onClick={props.handleOpenModal}>{props.selectedLocation}</a></p>
            )}
        </div>
    )
};