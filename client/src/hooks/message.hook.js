import {useCallback} from "react";
import React from "react";

export const useMessage = () => {
    return useCallback(text => {
        if (text) {
            return (
                <div className="alert alert-warning alert-dismissible fade show hide m-0 p-0 text-center" role="alert">
                    {text}
                </div>
            )
        }
    }, [])
};