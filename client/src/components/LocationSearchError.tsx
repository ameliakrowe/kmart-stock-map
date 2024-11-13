import React from "react";

type LocationSearchErrorProps = {
    message: string;
};

export const LocationSearchError = (props: LocationSearchErrorProps) => {
    const { message } = props;
    return (
        <div className="location-search-error">
            <p>{message}</p>
        </div>
    );
};
