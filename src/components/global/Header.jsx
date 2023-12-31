import {AppName} from "./AppName.jsx";
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {UserInfos} from "../header/UserInfos.jsx";
import {AdminToggle} from "../admin/AdminToggle.jsx";

export const Header = () => {
    return (
        <NavBar>
            <AppName size={'header'}/>
            <UserInfos />
        </NavBar>
    )
}

const NavBar = styled.div`
  user-select: none;
  height: 10%;
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound} ${theme.borderRadius.extraRound} 0 0;
  background: ${theme.colors.background_white};
  margin: 0;
  //box-shadow: ${theme.shadows.header};
`