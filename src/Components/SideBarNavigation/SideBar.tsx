import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import "./SideBar.css";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import { DtoMenuDefinition } from "../../Dto/menu";
import { useNavigate } from "react-router-dom";
import { CheckUserPermission } from "../../Utils/PermissionService";
import { styled } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import logo from "../../Assets/images/reblie.png";

interface SideBarProps {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuArray: DtoMenuDefinition[] = [
    {
        name: "Dashboard",
        redirectTo: "/customer",
        permission: ["superadmin", "admin"],
        icon: <InboxIcon style={{ color: "white" }} />,
    },
    {
        name: "Company",
        redirectTo: "/user",
        permission: ["superadmin", "admin"],
        icon: <InboxIcon style={{ color: "white" }} />,
    },
    {
        name: "Users",
        redirectTo: "/user/table",
        permission: ["superadmin", "admin"],
        icon: <InboxIcon style={{ color: "white" }} />,
    },
];

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: "#222a45 !important",
}));

export default function SideBar({ openMenu, setOpenMenu }: SideBarProps) {
    let navigate = useNavigate();

    const toggleDrawer = useCallback(
        () => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setOpenMenu((previousState: boolean) => !previousState);
        },
        [setOpenMenu]
    );

    useEffect(() => {}, []);

    const list = () => (
        <Box
            sx={{ width: "auto" }}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                {MenuArray.map((menu, index) => {
                    if (CheckUserPermission(menu.permission) === false) {
                        return null;
                    }
                    return (
                        <ListItem key={menu.name} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate(menu.redirectTo);
                                }}
                            >
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#222a45 !important",
                        color: "white !important",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openMenu}
                onClose={toggleDrawer()}
            >
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer()}>
                        <img alt="Reblie" src={logo} style={{width: '50%'}}></img>
                    </IconButton>
                </DrawerHeader>
                {list()}
            </Drawer>
        </Box>
    );
}
