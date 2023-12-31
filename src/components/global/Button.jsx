import {MdKeyboardArrowRight} from "react-icons/md";
import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {useContext} from "react";
import {CartContext} from "../../context/CartContext.jsx";

export const Button = (props) => {
    const primary = props?.style === 'primary';
    const disable = props?.style === 'disable';
    const {value, onClick, size, isSelected, adminMode} = props;

    if (primary) {
        if (size === 'big') {
            return <PrimaryButtonStyle onClick={onClick}>{value}</PrimaryButtonStyle>
        }
        else if (size === 'small') {
            return <SmallPrimaryButtonStyle $adminMode={adminMode} $isSelected={isSelected} onClick={onClick}>{value}</SmallPrimaryButtonStyle>
        }
        else {
            return <PrimaryButtonStyle $size={size} onClick={onClick}>{value}</PrimaryButtonStyle>
        }
    } else if (disable) {
        return <SmallDisableButtonStyle $adminMode={adminMode} $isSelected={isSelected}>{value}</SmallDisableButtonStyle>
    } else {
        return <BasicButtonStyle onClick={onClick}>{value}</BasicButtonStyle>
    }
}

const PrimaryButtonStyle = styled.div`
  width: ${props => props.$size ? `${props.$size}px` : '100%'};
  height: 60px;
  text-decoration: none;
  background: ${props => props.$isSelected ? theme.colors.white : theme.colors.primary};
  transition: 200ms all;
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.P2};
  font-weight: ${theme.fonts.weights.semiBold};
  font-family: 'Open Sans', 'serif';
  cursor: pointer;
  border-radius: ${theme.borderRadius.round};
  border: solid 4px ${theme.colors.primary};
  
  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
  }
`

const SmallPrimaryButtonStyle = styled.div`
  user-select: none;
  width: 75px;
  height: 30px;
  text-decoration: none;
  //background: ${theme.colors.primary};
  background: ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
  color: ${props => props.$isSelected && props.$adminMode ? theme.colors.primary : theme.colors.white};
  transition: 200ms all;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.XXS};
  font-weight: ${theme.fonts.weights.semiBold};
  font-family: 'Open Sans', 'serif';
  cursor: pointer;
  border-radius: ${theme.borderRadius.round};
  border: solid 1px ${theme.colors.primary};
  //position: absolute;
  //bottom: 35px;
  //right: 10px;
  
  &:hover {
    border: solid 1px ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
    background: ${props => props.$isSelected && props.$adminMode ? theme.colors.primary : theme.colors.white};
    color: ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
  }
`

const SmallDisableButtonStyle = styled.div`
  user-select: none;
  width: 75px;
  height: 30px;
  text-decoration: none;
  //background: ${theme.colors.primary};
  background: ${theme.colors.white};
  color: ${theme.colors.greyDark};
  transition: 200ms all;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.XXS};
  font-weight: ${theme.fonts.weights.semiBold};
  font-family: 'Open Sans', 'serif';
  border-radius: ${theme.borderRadius.round};
  border: solid 1px ${theme.colors.greyMedium};
`

const BasicButtonStyle = styled.div`
  width: 100%;
  height: 60px;
  text-decoration: none;
  background: ${theme.colors.white};
  transition: 200ms all;
  color: ${theme.colors.greyDark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.P2};
  font-weight: ${theme.fonts.weights.semiBold};
  font-family: 'Open Sans', 'serif';
  cursor: pointer;
  border-radius: ${theme.borderRadius.round};
  
  &:hover {
    background: ${theme.colors.greyDark};
    color: ${theme.colors.white};
  }
`