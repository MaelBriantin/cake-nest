import {styled, keyframes} from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {theme} from "../../theme/index.js";
import {MdAccountCircle, MdCloudDone} from "react-icons/md";
import {AdminToggle} from "../admin/AdminToggle.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {RxUpdate} from "react-icons/rx";
import {IoIosCloudDone} from "react-icons/io";
import {VscError} from "react-icons/vsc";
import {useAutoUpdate} from "../../hooks/store/useAutoUpdate.js";
import {CartContext} from "../../context/CartContext.jsx";

export const UserInfos = () => {
    // autoUpdate remote / local store
    useAutoUpdate()

    const {user, setUser, setColor} = useContext(UserContext)
    const navigate = useNavigate()
    const {setAdminMode, setOpenedPanel, setSelectedTab} = useContext(AdminContext)
    const {sync, syncFailed, setSync} = useContext(StoreContext)
    const {setCart, cart} = useContext(CartContext)
    const handleDisconnect = () => {
        navigate('/')
        setCart([])
        setColor(theme.colors.primary)
        setUser('')
        setAdminMode(false)
        setOpenedPanel(true)
        setSelectedTab('')
    }
    return (
        <Connection>
            <AdminToggle />
            <Update>
                {(sync) && <RxUpdate className={'inSave'} />}
                {(!sync && !syncFailed) && <IoIosCloudDone className={'saved'} title={'Synchronisé. Relancer la synchronisation ?'} onClick={() => setSync(true)}/>}
                {(!sync && syncFailed) && <VscError className={'failed'} title={'Echec de synchronisation. Relancer ?'} onClick={() => setSync(true)}/>}
            </Update>
            <Infos>
                <h1>Salut, <span>{user.name}</span> !</h1>
                <p onClick={() => handleDisconnect()}>Se déconnecter</p>
            </Infos>
            <Icon>
                <MdAccountCircle />
            </Icon>
        </Connection>

    )
}

const LoadingKeyframe = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Saved = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`

const Update = styled.div`
  transition: all 400ms;
  font-size: ${theme.fonts.size.P3};
  .inSave{
    color: ${theme.colors.primary};
    animation: ${LoadingKeyframe} 1200ms linear infinite;
  }
  .saved{
    color: ${theme.colors.primary};
    
    animation: ${Saved} 800ms linear;
    cursor: pointer;
    transition: all 200ms;
  }
  .saved:hover{
    opacity: 0.5;
    color: ${theme.colors.primary};
  }
  .failed{
    color: ${theme.colors.red};
    animation: ${Saved} 800ms linear;
    transition: color 200ms;
  }
  .failed:hover{
    color: ${theme.colors.primary};
  }
`

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