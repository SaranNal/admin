import React from "react";
import { DtoRoutesDefinition } from "../Dto/auth";

import LoginPage from "../Pages/AuthPages/LoginPage";
import CustomerPage from "../Pages/HomePages/Customer";
import CustomerTable from "../Pages/HomePages/CustomerTable";
import UserTable from "../Pages/HomePages/UserTable";
import ForgotPassword from "../Pages/AuthPages/ForgotPassword";
import SetPassword from "../Pages/AuthPages/SetPassword";

export const ProtectedRoutes: DtoRoutesDefinition[] = [
    {
        path: "/",
        element: <></>,
        redirectTo: "/customer",
    },
    {
        path: "/customer",
        element: <CustomerPage />,
    },
    {
        path: "/customer-admin",
        element: <CustomerTable />,
        permission: ["superadmin"],
    },
    {
        path: "/user",
        element: <UserTable />,
        permission: ["superadmin"],
    },
    {
        path: "/user/table",
        element: <UserTable />,
        permission: ["superadmin", "admin"],
    },
];

export const AuthRoutes: DtoRoutesDefinition[] = [
    {
        path: "/sign-in",
        element: <LoginPage />,
    },
    {
        path: "/sign-up",
        element: <></>,
    },
    {
        path: "/set-password",
        element: <SetPassword />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
];
