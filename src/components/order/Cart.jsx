import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {useState} from "react";
import {IoMdCart} from "react-icons/io";

export const Cart = () => {
    const [opened, setOpened] = useState(false)
    const toggleOpened = () => {
        setOpened(!opened)
    }
    return (
        <CartContainer $opened={opened}>
            <CartHeader >
                <h1>Total</h1>
                <p>20</p>
            </CartHeader>
            <CartContent>
                Votre Commande est vide
            </CartContent>
            <span onClick={() => toggleOpened()}><IoMdCart /></span>
        </CartContainer>
    )
}


const CartContainer = styled.div`
  z-index: 3;
  position: relative;
  width: 15%;
  height: 100%;
  box-shadow: ${theme.shadows.card};
  font-family: 'Pacifico', 'sans-serif';
  color: ${theme.colors.greyMedium};
  transition: all 400ms;
  ${props => props.$opened && 'transform: translateX(-100%);'};
  //position: absolute;
  //top: 0;
  //left: 0;
  span{
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: -2;
    position: absolute;
    border-radius: 0 50% 50% 0;
    right: -30px;
    top: 50%;
    //transform: translateY(-45%);
    height: 40px;
    width: 40px;
    background: ${theme.colors.background_dark};
    color: ${theme.colors.primary};
    cursor: pointer;
  }
`

const CartHeader = styled.div`
  background: ${theme.colors.background_dark};
  font-family: 'Pacifico', 'sans-serif';
  color: ${theme.colors.primary};
  font-size: ${theme.fonts.size.P2};
  padding: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartContent = styled.div`
  background: ${theme.colors.background_white};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`