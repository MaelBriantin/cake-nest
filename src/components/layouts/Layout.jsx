import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Outlet} from "react-router-dom";
import {Header} from "../global/Header.jsx";

export const Layout = () => {
    return (
        <LayoutBackground>
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
  width: 100vw;
  background: ${theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const DisplayFrame = styled.div`
  height: 95vh;
  width: 90vw;
  background: ${theme.colors.background_white};
  border-radius: ${theme.borderRadius.extraRound};
  
  
`

const Main = styled.div`
  height: 85vh;
  width: 90vw;
  border-radius: 0 0 ${theme.borderRadius.extraRound} ${theme.borderRadius.extraRound};
  box-shadow: inset ${theme.shadows.frame};
`