import {useEffect, useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {callToast} from "../../utils/call_toast.js";
import {theme} from "../../theme/index.js";

export const AdminToggle = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const enableAdmin = () => {
        callToast('Mode admin activé !');
        setIsAdmin(true)
    }

    const disableAdmin = () => {
        callToast('Mode admin désactivé !');
        setIsAdmin(false)
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
  width: 175px;
  height: 25px;
  background: ${theme.colors.background_white};
  border-radius: ${theme.borderRadius.extraRound};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  transition: all 400ms;
  border: ${theme.colors.primary} 2px solid;
`


const ToggleOff = styled.div`
  width: 175px;
  height: 25px;
  background: ${theme.colors.background_dark};
  border-radius: ${theme.borderRadius.extraRound};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  transition: all 400ms;
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
`