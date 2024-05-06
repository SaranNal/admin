import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { TextField, Checkbox, Typography } from "@mui/material";

import { UnAuthorizedLayout } from "../Layouts/UnAuthorizedLayout";

import { useAppDispatch } from "../../Store/hooks";
import { showToaster } from "../../Store/toastSlice";
import { PostApiMethod } from "../../Utils/ApiService";
import { setIsAuthenticated, setUserDetails } from "../../Store/authSlice";
import { showLoader } from "../../Store/loaderSlice";

import * as Yup from "yup";
import { Formik } from "formik";

import { DisplayErrorMessages } from "../../Utils/HelperService";
import { ApiError, ApiResponse, loginUserInterface } from "../../Dto/api";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues: any = {
        email: "",
        password: "",
        keepMeLoggedin: false,
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
        email: Yup.string().required("Email is required").email("Email pattern not matched"),
    });

    const handleFormSubmit = useCallback((values: { email: string; password: string; keepMeLoggedin: boolean }) => {

        dispatch(showLoader(true));
        PostApiMethod("auth/login",values).then((res: ApiResponse<loginUserInterface>) => {
            const { accessToken,refreshToken,user } = res.data.data;
            dispatch(showLoader(false));
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
                dispatch(setIsAuthenticated(true));
                dispatch(
                    setUserDetails({
                        roles: user.role,
                        name: user.firstName + user.lastName,
                        email: user.email,
                    })
                );
                navigate("/customer");
        }).catch((err: ApiError) => {
            const error = DisplayErrorMessages(err);
            dispatch(showLoader(false));
            dispatch(
                showToaster({
                    dialogBgColor: "bg-danger",
                    dialogMsg: error ?? "Unauthorized",
                    showDialog: true,
                    timer: "5000",
                }));
            });

        },
        [dispatch, navigate]
    );

    return (
        <UnAuthorizedLayout>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            size="small"
                            type="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            helperText={touched.email && errors.email}
                            error={Boolean(errors.email && touched.email)}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            size="small"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            helperText={touched.password && errors.password}
                            error={Boolean(errors.password && touched.password)}
                            sx={{ mb: 1.5 }}
                        />
                        <div style={{ display: "flex" }}>
                            <Checkbox
                                size="small"
                                name="keepMeLoggedin"
                                onChange={handleChange}
                                checked={values.keepMeLoggedin}
                                sx={{ padding: 0 }}
                            />

                            <Typography sx={{ marginLeft: "10px" }}>
                            Keep me signed in
                            </Typography>
                        </div>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ my: 2 }}
                        >
                            Login
                        </LoadingButton>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                            sx={{ my: 2, ml: 2 }}
                        >
                            Forgot Password
                        </LoadingButton>
                    </form>
                )}
            </Formik>
        </UnAuthorizedLayout>
    );
};

export default LoginPage;
