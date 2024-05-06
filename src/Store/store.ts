import { configureStore,ThunkAction,Action } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import toastSlice from "./toastSlice";
import loaderSlice from "./loaderSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        toast: toastSlice,
        loader: loaderSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
