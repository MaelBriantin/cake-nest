import {LoginForm} from "../../components/login/LoginForm.jsx";
import cakeLogo from "../../assets/images/cupcake.png"
import loginBackground from "../../assets/images/tarts.jpg"
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {AppName} from "../../components/global/AppName.jsx";
import {LoginSubtitle} from "../../components/login/LoginSubtitle.jsx";

export const LoginPage = () => {
    return (
        <LoginStyle>
            <Container>
                <AppName size={'login'} />
                <LoginSubtitle />
                <LoginForm />
            </Container>
        </LoginStyle>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  align-items: center;
  height: 100%;
  width: 30%;
  margin: auto;
  position: relative;
  z-index: 3;
`



const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: ${theme.colors.dark};
  }
`

