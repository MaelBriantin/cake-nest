import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {theme} from "../../theme/index.js";
import {MdAccountCircle} from "react-icons/md";

export const UserInfos = (props) => {
    const navigate = useNavigate()
    const location = useLocation();

    const state = location.state
    const handleDisconnect = () => {
        navigate('/')
    }

    return (
        <Connection>
            <Infos>
                <h1>Salut <span>{state.user}</span></h1>
                <p onClick={() => handleDisconnect()}>Se déconnecter</p>
            </Infos>
            <Icon>
                <MdAccountCircle />
            </Icon>
        </Connection>

    )
}

const Connection = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  gap: 10px;
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Open Sans', 'serif';
  gap: 5px;
  color: ${theme.colors.greyDark};
  
  h1 {
    
  }
  span {
    color: ${theme.colors.primary};
    font-weight: ${theme.fonts.weights.bold};
  }
  p {
    font-size:${theme.fonts.size.XXS};
    text-decoration: none;
    text-transform: none;
    cursor: pointer;
    transition: all 200ms;
  }
  p:hover {
    color: ${theme.colors.primary};
  }
`
const Icon = styled.div`
  font-size: ${theme.fonts.size.P4};
  margin-top: 10px;
  color: ${theme.colors.greyDark};
`