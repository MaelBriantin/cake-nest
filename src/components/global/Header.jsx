import {AppName} from "./AppName.jsx";
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {UserInfos} from "../header/UserInfos.jsx";

export const Header = () => {
    return (
        <NavBar>
            <AppName size={'header'}/>
            <UserInfos />
        </NavBar>
    )
}

const NavBar = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound} ${theme.borderRadius.extraRound} 0 0;
  background: ${theme.colors.background_white};
  margin: 0;
  //box-shadow: ${theme.shadows.header};
`