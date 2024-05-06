import React, { createContext, useState, ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
    clearAuthSlice,
    fetchingUserDetails,
    setIsAuthenticated,
    setUserDetails,
} from "../Store/authSlice";
import { isLogin } from "./authService";

import { showToaster } from "../Store/toastSlice";
import { GetApiMethod } from "../Utils/ApiService";

import { LoadingComponent } from "../Components/Loading/LoadingComponent";
import { DisplayErrorMessages } from "../Utils/HelperService";

import { ApiError, ApiResponse } from "../Dto/api";

interface AuthContextProps {
    isAuthenticated: boolean;
}

const CheckLoginUser = () => {
    const dispatch = useAppDispatch();
    let fetchingUserData = React.useRef<boolean>(false);

    const fetchUserDetails = React.useCallback(() => {
        dispatch(fetchingUserDetails(true));
        GetApiMethod("user/user")
            .then((res: ApiResponse) => {
                if (res && res.status === 200) {
                    dispatch(setIsAuthenticated(true));
                    dispatch(setUserDetails(res.data.data));
                } else {
                    dispatch(
                        showToaster({
                            dialogBgColor: "bg-danger",
                            dialogMsg: res.data.message,
                            showDialog: true,
                            timer: "5000",
                        })
                    );
                    dispatch(setIsAuthenticated(false));
                }
                dispatch(fetchingUserDetails(false));
            })
            .catch((err: ApiError) => {
                const error = DisplayErrorMessages(err);
                dispatch(
                    showToaster({
                        dialogBgColor: "bg-danger",
                        dialogMsg: error ? error : "Unauthorized",
                        showDialog: true,
                        timer: "5000",
                    })
                );
                dispatch(fetchingUserDetails(false));
            });
    }, [dispatch]);

    React.useEffect(() => {
        if (isLogin()) {
            if (!fetchingUserData.current) {
                fetchingUserData.current = true;
                fetchUserDetails();
            }
        } else {
            dispatch(fetchingUserDetails(false));
            localStorage.clear();
            dispatch(clearAuthSlice());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    let authState = useAppSelector((state) => state.auth);
    const [isAuthenticated] = useState<boolean>(true);
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {authState.loading ? <LoadingComponent /> : children}
        </AuthContext.Provider>
    );
};

export default CheckLoginUser;
