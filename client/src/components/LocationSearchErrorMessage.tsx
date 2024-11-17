import React from "react";

type LocationSearchErrorMessageProps = {
    message: string;
};

export const LocationSearchErrorMessage = (
    props: LocationSearchErrorMessageProps,
) => {
    const { message } = props;
    return (
        <div className="location-search-error">
            <p>{message}</p>
        </div>
    );
};
