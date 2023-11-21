import {theme} from "../../theme/index.js";
import styled from "styled-components";

export const LoginSubtitle = () => {
    return (
        <>
            <Welcome>Bienvenue chez nous !</Welcome>
            <Divider></Divider>
            <Subtitle>Connectez-vous</Subtitle>
        </>
    )
}

const Divider = styled.div`
  width: 100%;
  background: ${theme.colors.loginLine};
  height: 5px;
`
const Welcome = styled.div`
  font-family: 'Pacifico', 'sans-serif';
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.white};
  font-size: ${theme.fonts.size.P6};
`
const Subtitle = styled.div`
  font-family: 'Pacifico', 'sans-serif';
  color: ${theme.colors.white};
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.white};
  font-size: ${theme.fonts.size.P5};
`