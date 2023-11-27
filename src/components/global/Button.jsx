import {MdKeyboardArrowRight} from "react-icons/md";
import styled from "styled-components";
import {theme} from "../../theme/index.js";

export const Button = (props) => {
    const primary = props?.style === 'primary';
    const {value, onClick, size, isSelected, adminMode} = props;
    if (primary) {
        if (size === 'big') {
            return <PrimaryButtonStyle onClick={onClick}>{value}</PrimaryButtonStyle>
        }
        else if (size === 'small') {
            return <SmallPrimaryButtonStyle $adminMode={adminMode} $isSelected={isSelected} onClick={onClick}>{value}</SmallPrimaryButtonStyle>
        }
        else {
            return <PrimaryButtonStyle onClick={onClick}>{value}</PrimaryButtonStyle>
        }
    } else {
        return <BasicButtonStyle onClick={onClick}>{value}</BasicButtonStyle>
    }
}

const PrimaryButtonStyle = styled.div`
  width: 100%;
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
  
  &:hover {
    border: solid 1px ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
    background: ${props => props.$isSelected && props.$adminMode ? theme.colors.primary : theme.colors.white};
    color: ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
  }
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