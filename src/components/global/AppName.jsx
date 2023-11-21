import cakeLogo from "../../assets/images/cupcake.png";
import {theme} from "../../theme/index.js";
import styled from "styled-components";

export const AppName = () => {
    return (
        <>
            <Title>
                Cake
                <Logo alt='' src={cakeLogo}/>
                Nest
            </Title>
        </>
    )
}

const Title = styled.div`
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

const Logo = styled.img`
  width: 70px;
  height: 70px;
  padding-bottom: 25px;
`