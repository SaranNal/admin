import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DtoUserData } from "../Dto/auth";
import { RootState } from "./store";

const defaultValue: DtoUserData = {
    loading: true,
    adminData: {},
    error: "",
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: defaultValue,
    reducers: {
        fetchingUserDetails: (state,action) => {
            state.loading = action.payload;
        },
        setIsAuthenticated: (state,action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setError: (state,action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setUserDetails: (
            state,
            action: PayloadAction<{ [index: string]: any }>
        ) => {
            state.adminData = action.payload;
        },
        clearAuthSlice: (state) => {
            state.loading = false;
            state.adminData = {};
            state.error = "";
            state.isAuthenticated = false;
        },
    },
});

export const authStateValue = (state: any) => state;

export const {
    fetchingUserDetails,
    setIsAuthenticated,
    setError,
    setUserDetails,
    clearAuthSlice
} = authSlice.actions;

export default authSlice.reducer;

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated === true && state.auth.error === "";
