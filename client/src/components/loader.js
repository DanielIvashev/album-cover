import React from "react";

export const Loader = () => {
    return (
        <div className="d-flex w-100 justify-content-center">
            <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};