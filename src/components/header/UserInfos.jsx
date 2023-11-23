import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {theme} from "../../theme/index.js";
import {MdAccountCircle} from "react-icons/md";
import {AdminToggle} from "../admin/AdminToggle.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.jsx";

export const UserInfos = (props) => {
    const {user, setUser, setColor} = useContext(UserContext)
    const navigate = useNavigate()
    const {setAdminMode, setOpenedPanel, setSelectedTab} = useContext(AdminContext)
    const handleDisconnect = () => {
        navigate('/')
        setColor(theme.colors.primary)
        setUser('')
        setAdminMode(false)
        setOpenedPanel(true)
        setSelectedTab('')
    }

    return (
        <Connection>
            <AdminToggle />
            <Infos>
                <h1>Salut, <span>{user}</span> !</h1>
                <p onClick={() => handleDisconnect()}>Se déconnecter</p>
            </Infos>
            <Icon>
                <MdAccountCircle />
            </Icon>
        </Connection>

    )
}

const Connection = styled.div`
  //width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  gap: 20px;
`

const Infos = styled.div`
  //width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Open Sans', 'serif';
  gap: 5px;
  color: ${theme.colors.greyDark};
  font-size: ${theme.fonts.size.P1};
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
    font-size: ${theme.fonts.size.P0};
  }
  p:hover {
    color: ${theme.colors.primary};
  }
`
const Icon = styled.div`
  font-size: ${theme.fonts.size.P5};
  margin-top: 10px;
  color: ${theme.colors.greyDark};
`