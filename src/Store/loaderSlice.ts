import { createSlice } from "@reduxjs/toolkit";
import { LoaderInterfaceData } from "../Dto/loader";

const defaultValue: LoaderInterfaceData = {
    showLoader: false,
};

export const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState: defaultValue,
    reducers: {
        showLoader: (state,action) => {
            let newValueState = { ...state };
            newValueState.showLoader = action.payload
            return newValueState;
        },
    },
});
export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
