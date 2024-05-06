import React, { useEffect } from "react";
import "./Toaster.css";
import { hideToaster } from "../../Store/toastSlice";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { Alert, Snackbar } from "@mui/material";

export default function Toaster() {
    let toastState = useAppSelector((state) => state.toast);
    const dispatch = useAppDispatch();
    const onDismissToast = () => {
        dispatch(hideToaster());
    };

    useEffect(() => {
        if (toastState.timer) {
            setTimeout(() => {
                onDismissToast();
            }, +toastState.timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toastState]);

    return toastState.showDialog ? (
        <Snackbar
            open={toastState.showDialog}
            onClose={() => onDismissToast()}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={() => onDismissToast()}
                severity={
                    toastState.dialogBgColor &&
                    toastState.dialogBgColor === "bg-danger"
                        ? "error"
                        : "success"
                }
                variant="filled"
                sx={{ width: "100%" }}
            >
                {toastState.dialogMsg}
            </Alert>
        </Snackbar>
    ) : (
        <></>
    );
}
