import {Outlet, useNavigate} from "react-router-dom";
import loginBackground from "../../assets/images/tarts.jpg"
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {AppName} from "../global/AppName.jsx";

export const LoginLayout = () => {
    const navigate = useNavigate()
    const returnToLogin = () => {
        navigate('/')
    }
    return (
        <LoginStyle>
            <Container>
                <AppName size={'login'} onClick={() => returnToLogin()}/>
                <Outlet />
            </Container>
        </LoginStyle>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  align-items: center;
  height: 100%;
  width: 40%;
  margin: auto;
  position: relative;
`

const LoginStyle = styled.div`
  user-select: none;
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

