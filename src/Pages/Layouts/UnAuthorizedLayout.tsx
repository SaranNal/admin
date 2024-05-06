import { ReactNode, useEffect, useState } from "react";
import { Card, Grid, styled } from "@mui/material";

import Toaster from "../../Components/Toaster/Toaster";
import { LoadingComponent } from "../../Components/Loading/LoadingComponent";

import "./UnAuthorizedLayout.css";
import reblieLogo from "../../Assets/images/reblie-logo.png";
import { useLocation } from "react-router-dom";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
    height: "100%",
    padding: "32px",
    position: "relative",
    background: "rgba(0, 0, 0, 0.01)",
}));

const StyledRoot = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A2038",
    minHeight: "100% !important",
    "& .card": {
        maxWidth: 800,
        minHeight: 400,
        margin: "1rem",
        display: "flex",
        borderRadius: 12,
        alignItems: "center",
        background: "whitesmoke"
    },

    ".img-wrapper": {
        display: "flex",
        padding: "2rem",
        alignItems: "center",
        justifyContent: "center",
    },
}));

interface Props {
    children: ReactNode;
}

export const UnAuthorizedLayout = (props: Props) => {
    const { children } = props;
    const location = useLocation();
    const { pathname } = location;
    const [isVerticalLogo, setVerticalLogo] = useState(true);

    useEffect(() => {
      setVerticalLogo(pathname === "/sign-in" ? false : true)
    },[pathname])

  return (
    <StyledRoot className="unAuthorizedLayout-root">
      <LoadingComponent />
      <Card className={isVerticalLogo ? "custom-card card" : "card"}>
        <Grid container>
          {!isVerticalLogo && (
            <>
              <Grid item sm={6} xs={12}>
                <div className="img-wrapper">
                  <img src={reblieLogo} height="100%" width="100%" alt="" />
                </div>
              </Grid>
            </>
          )}
          <Grid item sm={isVerticalLogo ? 12 : 6} xs={12}>
            <ContentBox>
            {isVerticalLogo && (
                <>
                 <Grid item sm={12} xs={12}>
                  <img src={reblieLogo} height="100%" width="100%" alt="" />
              </Grid>
                </>
            ) }

                {children}
                </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <Toaster />
    </StyledRoot>
  );
};
