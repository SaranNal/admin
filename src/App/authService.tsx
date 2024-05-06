import React from "react";

export const isLogin = () => {
    const loginCheck = localStorage.getItem("accessToken");
    if (loginCheck) {
        return true;
    }
    return false;
};
