import {theme} from "../../theme/index.js";
import styled from "styled-components";

export const LoginSubtitle = (props) => {
    const {type} = props
    return (
        <>
            {type === 'login' &&
                (
                    <Welcome>
                        Bienvenue chez nous !
                    </Welcome>
                )
            }
            <Divider />
            <Subtitle>
                {type === 'login' && 'Connectez-vous !'}
                {type === 'signin' && 'Créez votre compte !'}
            </Subtitle>
        </>
    )
}

const Divider = styled.div`
  width: 100%;
  background: ${theme.colors.loginLine};
  height: 5px;
`
const Welcome = styled.div`
  width: 100%;
  text-align: center;
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