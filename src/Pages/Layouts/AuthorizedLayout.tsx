import React, { ReactNode, useState } from "react";

import SideBar from "../../Components/SideBarNavigation/SideBar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Toaster from "../../Components/Toaster/Toaster";

import { styled } from "@mui/material/styles";
import { LoadingComponent } from "../../Components/Loading/LoadingComponent";

interface Props {
    children: ReactNode;
}
export const AuthorizedLayout = (props: Props) => {
    const { children } = props;
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const drawerWidth = 240;

    const Main = styled("main", {
        shouldForwardProp: (prop) => prop !== "open",
    })<{ open?: boolean }>(({ theme, open }) => ({
        flexGrow: 1,

        padding: theme.spacing(3),
        paddingTop: 64,
        minHeight: "calc(100vh - 64px)",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: `+${drawerWidth}px`,
        }),
    }));

    return (
        <div>
            <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <Main open={openMenu}>{children}</Main>
            <LoadingComponent />
            <Footer openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <Toaster />
        </div>
    );
};
