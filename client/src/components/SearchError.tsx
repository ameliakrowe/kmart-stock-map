import React from "react";

type SearchErrorProps = {
    message: string;
};

export const SearchError = (props: SearchErrorProps) => {
    const { message } = props;
    return (
        <div className="search-error">
            <p>{message}</p>
        </div>
    );
};
