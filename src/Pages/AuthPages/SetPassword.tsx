import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { showToaster } from "../../Store/toastSlice";
import { showLoader } from "../../Store/loaderSlice";

import { UnAuthorizedLayout } from "../Layouts/UnAuthorizedLayout";
import { useAppDispatch } from "../../Store/hooks";
import { PostApiMethod } from "../../Utils/ApiService";

import * as Yup from "yup";
import { Formik as FormHandler } from "formik";

import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { ApiError, ApiResponse } from "../../Dto/api";
import { DisplayErrorMessages } from "../../Utils/HelperService";

const UserSetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const signUpPayload = Yup.object().shape({
        password: Yup.string()
            .max(50)
            .min(8)
            .matches(
                /[A-Z]/,
                "Password must contain at least one capital letter"
            )
            .matches(
                /[^A-Za-z0-9]/,
                "Password must contain at least one symbol"
            )
            .required("Password is required")
            .trim("Empty password are not acceptable"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm passwords must match")
            .required(),
    });

    const handleFormSubmit = useCallback(
        (values: setPassword) => {
            const passwordAccessToken = searchParams.get("code");
            dispatch(showLoader(true));
            PostApiMethod("auth/set-password", {
                code: passwordAccessToken,
                password: values.password,
            })
                .then((res: ApiResponse) => {
                    navigate("sign-in");
                    dispatch(showLoader(false));
                    dispatch(
                        showToaster({
                            dialogBgColor: "bg-success",
                            dialogMsg: res.data.message ?? "Successfully",
                            showDialog: true,
                            timer: "5000",
                        })
                    );
                })
                .catch((err: ApiError) => {
                    const error = DisplayErrorMessages(err);
                    dispatch(
                        showToaster({
                            dialogBgColor: "bg-danger",
                            dialogMsg: error ?? "Unauthorized",
                            showDialog: true,
                            timer: "5000",
                        })
                    );
                    dispatch(showLoader(false));
                });
        },
        [dispatch, navigate, searchParams]
    );

    const checkTokenExpiry = useCallback(
        (token: string | null) => {
            if (token) {
                dispatch(
                    showLoader({
                        showLoader: true,
                        loaderMessage: "Please wait ....",
                    })
                );
                PostApiMethod("auth/set-password", { code: token })
                    .then((res: ApiResponse) => {
                        dispatch(showLoader(false));
                        dispatch(
                            showToaster({
                                dialogBgColor: "bg-success",
                                dialogMsg: res.data.message ?? "Successfully",
                                showDialog: true,
                                timer: "5000",
                            })
                        );
                    })
                    .catch((err: ApiError) => {
                        const error = DisplayErrorMessages(err);
                        dispatch(
                            showToaster({
                                dialogBgColor: "bg-danger",
                                dialogMsg: error ?? "Unauthorized",
                                showDialog: true,
                                timer: "5000",
                            })
                        );
                        dispatch(showLoader(false));
                        navigate("sign-in");
                    });
            } else {
                dispatch(
                    showToaster({
                        dialogBgColor: "bg-danger",
                        dialogMsg: "Unauthorized",
                        showDialog: true,
                        timer: "5000",
                    })
                );
                navigate("sign-in");
            }
        },
        [dispatch, navigate]
    );

    useEffect(() => {
        const passwordAccessToken = searchParams.get("code");
        checkTokenExpiry(passwordAccessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UnAuthorizedLayout>
            <div className="set-password-form">
                <FormHandler
                    onSubmit={handleFormSubmit}
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={signUpPayload}
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
                                    name="password"
                                    type="password"
                                    label="Password"
                                    size="small"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.password}
                                    onChange={handleChange}
                                    helperText={
                                        touched.password && errors.password
                                    }
                                    error={Boolean(
                                        errors.password && touched.password
                                    )}
                                    sx={{ mb: 3 }}
                                />
                            {/* </div> */}
                            {/* <div className="form-group"> */}
                                <TextField
                                    fullWidth
                                    name="confirmPassword"
                                    type="password"
                                    label="confirmPassword"
                                    size="small"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    helperText={
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                    }
                                    error={Boolean(
                                        errors.confirmPassword &&
                                            touched.confirmPassword
                                    )}
                                    sx={{ mb: 3 }}
                                />
                            {/* </div> */}

                                <LoadingButton
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{ my: 1 }}
                                    fullWidth
                                >
                                    Submit
                                </LoadingButton>
                            {/* <div className="login-button"> */}
                                <LoadingButton
                                    type="reset"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ my: 1 }}
                                    fullWidth
                                    onClick={() => navigate("/sign-in")}
                                >
                                    Cancel
                                </LoadingButton>
                        </form>
                    )}
                </FormHandler>
            </div>
        </UnAuthorizedLayout>
    );
};

export default UserSetPassword;
