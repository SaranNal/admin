import React from "react";
import { useAppSelector } from "../Store/hooks";

export const CheckUserPermission = (role: Array<string> | undefined) => {
    let authState = useAppSelector((state) => state.auth);
    if (!role) {
        return true
    } else if (authState.adminData && authState.adminData.roles && authState.adminData.roles.name && role && role.includes(authState.adminData.roles.name.toLowerCase())) {
        return true;
    }
    return false;
};
