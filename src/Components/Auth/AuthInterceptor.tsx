import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios, {
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import { useAppDispatch } from "../../Store/hooks";
import { clearAuthSlice, setUserDetails } from "../../Store/authSlice";

import { PostApiMethod } from "../../Utils/ApiService";
import { CommonObject } from "../../Dto/generic";

const axiosApiInstance = axios.create();

export const AuthInterceptor = () => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const logout = useCallback(
        (reject: () => void) => {
            localStorage.clear();
            dispatch(clearAuthSlice());
            navigate("/sign-in");
            reject();
        },
        [dispatch, navigate]
    );

    const getRefreshToken = useCallback(
        (
            originalRequest: InternalAxiosRequestConfig<any>,
            resolve: (arg0: Promise<AxiosResponse<any, any>>) => void,
            reject: () => void
        ) => {
            const payloadRefreshToken = localStorage.getItem("refreshToken");
            if (payloadRefreshToken) {
                PostApiMethod("auth/refreshToken", {
                    refreshToken: payloadRefreshToken,
                })
                    .then((response) => {
                        if (response && response.status === 200) {
                            const { refreshToken, accessToken, user } =
                                response.data.data;
                            localStorage.setItem("accessToken", accessToken);
                            localStorage.setItem("refreshToken", refreshToken);
                            dispatch(
                                setUserDetails({
                                    roles: [user.role],
                                    name: user.firstName + user.lastName,
                                    email: user.email,
                                })
                            );
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            axios.defaults.headers.common[
                                "Authorization"
                            ] = `Bearer ${accessToken}`;
                            resolve(axiosApiInstance(originalRequest));
                        } else {
                            logout(reject);
                        }
                    })
                    .catch((error) => {
                        logout(reject);
                    });
            } else {
                logout(reject);
            }
        },
        [dispatch, logout]
    );

    // Request interceptor
    axios.interceptors.request.use(
        async function (config: InternalAxiosRequestConfig<any>) {
            // Updating the request header.
            if (!config.headers["Content-Type"]) {
                config.headers["Content-Type"] = "application/json";
                config.headers.Accept = "application/json";
            }
            config.headers["Access-Control-Allow-Origin"] = "*";
            config.headers["Access-Control-Allow-Methods"] =
                "POST, GET, PUT, OPTIONS, DELETE";
            config.headers["app-type"] = 'adminApp';        
            let token = localStorage.getItem("accessToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        function (error: AxiosError<unknown, any>) {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axios.interceptors.response.use(
        function (
            response:
                | AxiosResponse<CommonObject, any>
                | Promise<AxiosResponse<CommonObject, any>>
        ) {
            return response;
        },
        // Assuming this function is part of an Axios interceptor
        async function errorHandler(
            error: AxiosError<unknown, any> | Promise<AxiosError<unknown, any>>
        ) {
            const axiosError = await Promise.resolve(error); // Ensure the error is resolved if it's a Promise
            const originalRequest = axiosError.config!;

            const promise = new Promise((resolve, reject) => {
                if (axiosError.response && axiosError.response.status === 403) {
                    resolve(axiosApiInstance(originalRequest));
                    logout(() => reject(axiosError)); // Need to handle the permission error.
                } else if (
                    axiosError.response &&
                    axiosError.response.status === 401
                ) {
                    getRefreshToken(originalRequest, resolve, () =>
                        reject(axiosError)
                    );
                } else {
                    reject(axiosError);
                }
            });
            return promise;
        }
    );
};
