import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../../Store/hooks";
import "./Loader.css";

export const LoadingComponent = () => {
    let loaderState = useAppSelector((state) => state.loader);
    return (
        <>
            {loaderState.showLoader && (
                <div className="loader-component">
                    <div
                        className="spinner-border text-danger spinner-loader"
                        role="status"
                    >
                        <CircularProgress />
                    </div>
                </div>
            )}
        </>
    );
};
