import {MdKeyboardArrowRight} from "react-icons/md";
import styled from "styled-components";
import {theme} from "../../theme/index.js";

export const Button = (props) => {
    const primary = props?.style === 'primary';
    const {value, onClick} = props;
    if (primary) {
        return <ButtonStyle onClick={onClick}>{value}</ButtonStyle>
    } else {
        return <BasicButtonStyle onClick={onClick}>{value}</BasicButtonStyle>
    }
}

const ButtonStyle = styled.div`
  width: 100%;
  height: 60px;
  text-decoration: none;
  background: ${theme.colors.primary};
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
  border: solid 1px ${theme.colors.primary};
  
  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
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