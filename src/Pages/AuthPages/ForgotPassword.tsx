import React, { useCallback, useState } from "react";

import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { UnAuthorizedLayout } from "../Layouts/UnAuthorizedLayout";

import { useAppDispatch } from "../../Store/hooks";
import { PostApiMethod } from "../../Utils/ApiService";
import { showToaster } from "../../Store/toastSlice";
import { showLoader } from "../../Store/loaderSlice";
import { DisplayErrorMessages } from "../../Utils/HelperService";

import * as Yup from "yup";
import { Formik } from "formik";
import { ApiError, ApiResponse } from "../../Dto/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [linkSent, setLinkSent] = useState(false);
    const initialValues: { email: string; fromAdmin: boolean } = {
        email: "",
        fromAdmin: true,
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email pattern not matched"),
    });

    const handleFormSubmit = useCallback(
        async (values: { email: string; fromAdmin: boolean }) => {
            dispatch(showLoader(true));
            PostApiMethod("auth/forgotPassword", values)
                .then((res: ApiResponse) => {
                    if (res.status === 200) {
                        setLinkSent(true);
                        setTimeout(() => {
                            navigate("/sign-in");
                            dispatch(showLoader(false));
                        }, 5000);
                        dispatch(
                            showToaster({
                                dialogBgColor: "bg-success",
                                dialogMsg: res.data.message,
                                showDialog: true,
                                timer: "5000",
                            })
                        );
                    } else {
                        dispatch(
                            showToaster({
                                dialogBgColor: "bg-danger",
                                dialogMsg: res.data.message,
                                showDialog: true,
                                timer: "5000",
                            })
                        );
                    }
                    dispatch(showLoader(false));
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
        [dispatch]
    );

    return (
        <UnAuthorizedLayout>
            <div className="showToaster">
                {!linkSent ? (
                    <>
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
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        error={Boolean(
                                            errors.email && touched.email
                                        )}
                                        sx={{ mb: 1.5 }}
                                    />
                                    <LoadingButton
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{ my: 1 }}
                                        fullWidth
                                    >
                                        Reset Password
                                    </LoadingButton>     
                                     <LoadingButton
                                         type="submit"
                                         color="primary"
                                         variant="outlined"
                                         onClick={() => {
                                          navigate("sign-in");
                                          }}
                                         sx={{ my: 1, }}
                                         fullWidth>
                                          Go back
                                    </LoadingButton>
                                </form>
                            )}
                        </Formik>
                    </>
                ) : (
                    <>
                        <div>
                            <p>
                                Password reset link sent to email address
                                successfully
                            </p>
                        </div>
                    </>
                )}
            </div>
        </UnAuthorizedLayout>
    );
};

export default ForgotPassword;
