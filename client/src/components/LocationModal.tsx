type LocationModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const LocationModal = (props: LocationModalProps) => {
    if (!props.isOpen) return null;

    return (
        <a href="#" onClick={props.onClose}>Close</a>
    )
};