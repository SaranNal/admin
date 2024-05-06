import React from "react";
import { NotFound } from "../../Components/Error/404";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout";

const PageNotFound = () => {
    return (
        <AuthorizedLayout>
            <NotFound />
        </AuthorizedLayout>
    );
};

export default PageNotFound;
