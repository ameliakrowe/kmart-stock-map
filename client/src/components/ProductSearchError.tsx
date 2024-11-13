import React from "react";

type ProductSearchErrorProps = {
    message: string;
};

export const ProductSearchError = (props: ProductSearchErrorProps) => {
    const { message } = props;
    return (
        <div className="product-search-error">
            <p>{message}</p>
        </div>
    );
};
