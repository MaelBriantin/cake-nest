import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Outlet} from "react-router-dom";
import {Header} from "../global/Header.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.jsx";

export const Layout = () => {
    const {color} = useContext(UserContext)
    return (
        <LayoutBackground $color={color}>
            <DisplayFrame>
                    <Header/>
                    <Main>
                        <Outlet />
                    </Main>
            </DisplayFrame>
        </LayoutBackground>
    )
}

const LayoutBackground = styled.div`
  height: 100vh;
  //width: 100vw;
  //overflow: hidden;
  padding: 20px 50px;
  background: ${props => props.$color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 400ms;
`

const DisplayFrame = styled.div`
  height: 100%;
  width: 100%;
  //background: ${theme.colors.background_white};
  //border-radius: ${theme.borderRadius.extraRound};
`

const Main = styled.div`
  background: ${theme.colors.background_white};
  height: 85%;
  border-radius: 0 0 ${theme.borderRadius.extraRound} ${theme.borderRadius.extraRound};
  box-shadow: inset ${theme.shadows.frame};
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`