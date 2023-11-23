import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useContext} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";

export function Tab(props) {
    const {openTab, value, onClick, icon, isSelected} = props
    if (openTab) {
        const {openedPanel, setOpenedPanel} = useContext(AdminContext)
        const handleOpen = () => {
            setOpenedPanel(!openedPanel);
        };
        return (
            <OpenTabModel $openedPanel={openedPanel} onClick={() => handleOpen()}>{openedPanel ? <IoIosArrowUp/> : <IoIosArrowDown/>}</OpenTabModel>
        )
    } else {
        return (
            <TabModel onClick={() => onClick()} $isSelected={isSelected}>
                <span>{icon}</span>
                <span>{value}</span>
            </TabModel>
        )
    }

}

const TabModel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  min-width: 150px;
  height: 40px;
  cursor: pointer;
  border-radius: ${theme.borderRadius.round} ${theme.borderRadius.round} 0 0;
  background: ${props => props.$isSelected ? theme.colors.background_white : theme.colors.background_white};
  color: ${props => props.$isSelected && theme.colors.primary};
  transition: all 200ms;
  border: 1px solid${theme.colors.greyMedium};
  ${props => props.$isSelected && 'border-bottom: 0;'}
  &:hover{
    color: ${props => !props.$isSelected && theme.colors.primary};;
  }
`
const OpenTabModel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  cursor: pointer;
  border-radius: ${theme.borderRadius.round} ${theme.borderRadius.round} 0 0;
  border: 1px solid ${theme.colors.greyMedium};
  background: ${props => !props.$openedPanel ? theme.colors.primary : theme.colors.background_white};
  color: ${props => !props.$openedPanel && theme.colors.white};
  &:hover{
    color: ${props => props.$openedPanel && theme.colors.primary};
  }
`