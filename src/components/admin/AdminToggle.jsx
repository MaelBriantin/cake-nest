import {useContext, useState} from "react";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css'
import {callToast} from "../../utils/call_toast.js";
import {theme} from "../../theme/index.js";
import {AdminContext} from "../../context/AdminContext.jsx";

export const AdminToggle = (props) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const {adminMode, setAdminMode} = useContext(AdminContext)
    const enableAdmin = () => {
        callToast('Mode admin activé !');
        setIsAdmin(true)
        setAdminMode(true)
    }

    const disableAdmin = () => {
        callToast('Mode admin désactivé !');
        setIsAdmin(false)
        setAdminMode(false)
    }

    if (isAdmin) {
        return (
            <ToggleOn onClick={() => disableAdmin()}>
                <ToggleTitle>Mode admin ON</ToggleTitle>
                <ToggleButtonOn />
            </ToggleOn>
        )
    } else {
        return (
            <ToggleOff onClick={() => enableAdmin()}>
                <ToggleButtonOff />
                <ToggleTitle>Mode admin OFF</ToggleTitle>
            </ToggleOff>
        )
    }

}


const ToggleOn = styled.div`
  width: 160px;
  height: 25px;
  background: ${theme.colors.background_white};
  border-radius: ${theme.borderRadius.extraRound};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: ${theme.colors.primary} 2px solid;
`


const ToggleOff = styled.div`
  width: 160px;
  height: 25px;
  background: ${theme.colors.background_dark};
  border-radius: ${theme.borderRadius.extraRound};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: ${theme.colors.primary} 2px solid;
`

const ToggleButtonOn = styled.div`
  height: 25px;
  width: 25px;
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.circle};
`


const ToggleButtonOff = styled.div`
  height: 25px;
  width: 25px;
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.circle};
`

const ToggleTitle = styled.div`
  color: ${theme.colors.primary};
  margin-right: 5px;
  margin-left: 5px;
  font-size: ${theme.fonts.size.P0};
`