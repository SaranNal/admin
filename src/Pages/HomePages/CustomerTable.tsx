import React from "react";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout";

const CustomerTable = () => {
    return (
        <AuthorizedLayout>
            <button
                onClick={() => {
                    window.localStorage.clear();
                }}
            >
                {" "}
                Logout{" "}
            </button>
        </AuthorizedLayout>
    );
};
export default CustomerTable;
