import React,{ useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../Store/store";
import { showToaster } from "../Store/toastSlice";
import { ApiError } from "../Dto/api";



export const restrictInitialSpace = (e: any) => {
    if (e.keyCode === 32 && !e.target.value.length) {
        e.preventDefault();
    }
}
export const CheckPropertyExistOrNot = (data: any,key: string,loop?: string) => {
    if (loop) {
        return ((loop in data && data[loop] && key in data[loop]) ? data[loop][key] : "-")
    }
    return (key in data ? data[key] : "-");
}

export const textValidator = (payload: Array<{ value: string,maxLength: number | null,minLength: number | null,key: string }>) => {

    let error: Array<{ "key": string,"type": string }> = [];
    payload.forEach(textField => {
        if (textField && textField.value && textField.maxLength && textField.value.trim().length > textField.maxLength)
            error.push({ "key": textField.key,"type": "maxLength" });
        if (textField && textField.value && textField.minLength && textField.value.trim().length < textField.minLength)
            error.push({ "key": textField.key,"type": "minLength" });
    });
    return { "validation": (error && error.length > 0),"error": error };
}


export const DisplayToaster = (bg_color: string,message: string,timer?: string) => {

    store.dispatch(showToaster(
        {
            dialogBgColor: bg_color,
            dialogMsg: message,
            showDialog: true,
            timer: timer ?? '5000'
        }));
}
export const DisplayErrorMessages = (err: ApiError) => {
    let err_msg = "";
    let cnt = 0;
    if (err && err.response && err.response.data && err.response.data.errors) {
        err.response.data.errors.forEach((errors: { msg: string }) => {
            cnt += 1;
            err_msg += cnt + ". " + errors.msg + "\n";
        });
    } else if (err && err.response && err.response.data && err.response.data.message !== undefined) {
        err_msg = err.response.data.message ? err.response.data.message : "Something went wrong!";
    }
    return err_msg;
}


export const Login = () => {
    //const navigate = useNavigate();
    //FetchUserDetails();
    //navigate("/customer");
}