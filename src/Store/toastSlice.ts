import { createSlice } from "@reduxjs/toolkit";
import { ToastInterfaceData } from "../Dto/toast";

const defaultValue: ToastInterfaceData = {
    dialogBgColor: "",
    showDialog: false,
    dialogMsg: "",
    timer: "",
};

export const toastSlice = createSlice({
    name: "toastSlice",
    initialState: defaultValue,
    reducers: {
        showToaster: (state,action) => {
            let newValueState = { ...state };
            const payload = action.payload;
            newValueState.dialogBgColor = (payload && payload.dialogBgColor) ? payload.dialogBgColor : "";
            newValueState.dialogMsg = (payload && payload.dialogMsg) ? payload.dialogMsg : "";
            newValueState.timer = (payload && payload.timer) ? payload.timer : "";
            newValueState.showDialog = (payload && payload.showDialog) ? payload.showDialog : false;
            return newValueState;
        },
        hideToaster: (state) => {
            let newValueState = { ...state };
            newValueState.dialogBgColor = "";
            newValueState.dialogMsg = "";
            newValueState.timer = "";
            newValueState.showDialog = false;
            return newValueState;
        },
    },
});
export const { showToaster,hideToaster } = toastSlice.actions;
export default toastSlice.reducer;
