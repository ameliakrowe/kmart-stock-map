import { Result } from '../types/Result';

type LocationBannerProps = {
    selectedLocation: Result,
    handleOpenModal: () => void
}

export const LocationBanner = (props: LocationBannerProps) => {
    const { suburb } = props.selectedLocation;

    return (
        <div className="location-banner">
            {suburb.length < 1 && (
                <a href="#" className="location-select" onClick={props.handleOpenModal}>Select a location</a>
            )}
            {suburb.length >= 1 && (
                <p>Showing availability for <a href="#" className="location-select" onClick={props.handleOpenModal}>{suburb}</a></p>
            )}
        </div>
    )
};