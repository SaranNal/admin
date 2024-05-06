import React from "react";
import { AuthorizedLayout } from "../Layouts/AuthorizedLayout";

import { Typography } from "@mui/material";

const Customer = () => {
    return (
        <AuthorizedLayout>
            <div>
                <Typography>Welcome to dashboard </Typography>
            </div>
        </AuthorizedLayout>
    );
};
export default Customer;
