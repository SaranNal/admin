import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ThemeProvider, Toolbar, styled, useTheme } from "@mui/material";
import "./Footer.css";

interface HeaderProps {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// STYLED COMPONENTS
const AppFooter = styled(Toolbar)(() => ({
    display: "flex",
    alignItems: "center",
    minHeight: 64,
    "@media (max-width: 499px)": {
        display: "table",
        width: "100%",
        minHeight: "auto",
        padding: "1rem 0",
        "& .container": {
            flexDirection: "column !important",
            "& a": { margin: "0 0 16px !important" },
        },
    },
}));

const FooterContent = styled("div")(() => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0px 1rem",
    maxWidth: "1170px",
    margin: "0 auto",
}));

export default function Footer({ openMenu, setOpenMenu }: HeaderProps) {
    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }
    const drawerWidth = 240;

    const theme = useTheme();

    const footerTheme = theme;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar
                color="primary"
                position="static"
                sx={{ bottom: 0 }}
                open={openMenu}
                className="navbar-footer"
            >
                <AppFooter>
                    <FooterContent>{/* Content */}</FooterContent>
                </AppFooter>
            </AppBar>
        </ThemeProvider>
    );
}
