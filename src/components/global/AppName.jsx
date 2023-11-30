import cakeLogo from "../../assets/images/cupcake.png";
import {theme} from "../../theme/index.js";
import styled from "styled-components";

export const AppName = (props) => {
    const {size, onClick} = props
    if (size === 'login') {
        return (
            <LoginTitleClick onClick={onClick}>
                Cake
                <LoginLogo alt='' src={cakeLogo}/>
                Nest
            </LoginTitleClick>
        )
    } if (size === 'header') {
        return (
            <HeaderTitle>
                Cake
                <HeaderLogo alt='' src={cakeLogo}/>
                Nest
            </HeaderTitle>
        )
    }

}

const LoginTitle = styled.div`
  user-select: none;
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 5px;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-size: ${theme.fonts.size.P6};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.primary};
`

const LoginTitleClick = styled(LoginTitle)`
  cursor: pointer;
`

const HeaderTitle = styled.div`
  user-select: none;
  width: 25%;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  gap: 2px;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-size: ${theme.fonts.size.P4};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.primary};
`

const LoginLogo = styled.img`
  width: 70px;
  height: 70px;
`

const HeaderLogo = styled.img`
  width: 40px;
  height: 40px;
`