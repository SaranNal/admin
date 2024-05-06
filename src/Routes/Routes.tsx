import React from "react";

import { Navigate, useLocation, useRoutes } from "react-router-dom";

import { ProtectedRoutes, AuthRoutes } from "./Route";
import NotFoundPage from "../Pages/ErrorPages/PageNotFound";

import { DtoRoutesDefinition } from "../Dto/auth";
import { useAppSelector } from "../Store/hooks";
import { isAuthenticated } from "../Store/authSlice";

import { CheckUserPermission } from "../Utils/PermissionService";

const UnAuthRouteMiddleware = () => {
    const location = useLocation();
    return (
        <Navigate to="/sign-in" state={{ locationFrom: location.pathname }} />
    );
};

const AuthRouteMiddleware = () => {
    const redirectUrl = "/customer";
    const location = useLocation();

    return (
        <Navigate
            to={redirectUrl}
            state={{ locationFrom: location.pathname }}
        />
    );
};

const ProtectedRouteMiddleware = (routeDefinition: {
    routeInfo: DtoRoutesDefinition;
}) => {
    const location = useLocation();
    if (CheckUserPermission(routeDefinition.routeInfo.permission)) {
        if (routeDefinition.routeInfo.redirectTo) {
            return (
                <Navigate
                    to={routeDefinition.routeInfo.redirectTo}
                    state={{ locationFrom: location.pathname }}
                />
            );
        }
        return routeDefinition.routeInfo.element;
    } else {
        return (
            <Navigate
                to={"/error"}
                state={{ locationFrom: location.pathname }}
            />
        );
    }
};

const RoutesComponent = () => {
    const authenticated = useAppSelector(isAuthenticated);
    const ProtectedRoutesMap = ProtectedRoutes.map((routeInfo) => ({
        key: routeInfo.path,
        path: routeInfo.path,
        element: authenticated ? (
            <ProtectedRouteMiddleware routeInfo={routeInfo} />
        ) : (
            <UnAuthRouteMiddleware />
        ),
    }));
    const AuthRoutesMap = AuthRoutes.map((routeInfo) => ({
        key: routeInfo.path,
        path: routeInfo.path,
        element: !authenticated ? routeInfo.element : <AuthRouteMiddleware />,
    }));
    const commonRouteMap = [
        { path: "*", element: <Navigate replace to={"/customer"} /> },
    ];
    const errorRouteMap = [
        { path: "/error", element: <NotFoundPage />, key: "/error" },
    ];
    const mappedRoutes = [
        ...ProtectedRoutesMap,
        ...AuthRoutesMap,
        ...commonRouteMap,
        ...errorRouteMap,
    ];
    return useRoutes(mappedRoutes);
};

export const AppRoutes = () => {
    return <RoutesComponent />;
};
