import React from "react";
import CheckLoginUser, { AuthProvider } from "./AuthContext";
import { AuthInterceptor } from "../Components/Auth/AuthInterceptor";
import { AppRoutes } from "../Routes/Routes";

const App = () => {
    AuthInterceptor();
    CheckLoginUser();

    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
