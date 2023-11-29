import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {useContext, useState} from "react";
import {IoMdCart} from "react-icons/io";
import {CartCard} from "./CartCard.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {formatPrice} from "../../utils/maths.js";
import {AdminContext} from "../../context/AdminContext.jsx";

export const Cart = () => {
    const {cart} = useContext(CartContext)
    const {store, setOpenedCart, openedCart} = useContext(StoreContext)
    const {adminMode} = useContext(AdminContext)
    const toggleOpened = () => {
        setOpenedCart(!openedCart)
    }
    const actualCart = cart.map(e => {
        const item = store.find(i => i.id === e.id)
        const modifiedItem = Object.assign(item, {cartQuantity: cart.find(i => i.id === item.id).quantity})
        return Object.assign(modifiedItem, {addedAt: cart.find(i => i.id === item.id).addedAt})
    })
    let total = 0;
    let cartSize = 0;
    actualCart.map(i => {
        if(adminMode) {
            cartSize += i.cartQuantity
        } else {
            if (i.isAvailable) {
                cartSize += i.cartQuantity
            }
        }
        if (i.isAvailable) {
            total += i.price * i.cartQuantity
        }
    })
    actualCart.sort((a, b) => a.addedAt - b.addedAt)
    return (
        <CartContainer $opened={openedCart}>
            <CartHeader >
                <h1>Total</h1>
                <p>{formatPrice(total)}</p>
            </CartHeader>
            <CartContent $opened={openedCart}>
                <List>
                    {
                        (adminMode && actualCart.length > 0) &&
                            actualCart.map(item => <CartCard key={item.id} item={item}/>)
                    }
                    {
                        (!adminMode && actualCart.length) > 0 &&
                            actualCart.map(
                            item => {
                                if(item.isAvailable) {
                                   return (<CartCard key={item.id} item={item}/>)
                                }
                            })
                    }
                    {
                        actualCart === 0 && <NoCart>Aucun article dans le panier</NoCart>
                    }
                </List>
            </CartContent>
            <ToggleCart $opened={openedCart} onClick={() => toggleOpened()}><IoMdCart />
                {(cartSize > 0 && openedCart) && <span>{cartSize < 99 ? cartSize : '+99'}</span>}</ToggleCart>
        </CartContainer>
    )
}

const NoCart = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fonts.size.P3};
`

const CartContainer = styled.div`
  z-index: 3;
  position: absolute;
  width: 20%;
  height: 100%;
  box-shadow: ${theme.shadows.card};
  font-family: 'Pacifico', 'sans-serif';
  transition: all 400ms;
  ${props => props.$opened && 'transform: translateX(-100%);'};
`
const ToggleCart = styled.div`
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: -2;
    position: absolute;
    border-radius: 0 50% 50% 0;
    border: 2px solid ${theme.colors.primary};
    right: -35px;
    top: 45%;
    //transform: translateY(-45%);
    height: 50px;
    width: 40px;
    background: ${theme.colors.background_dark};
    color: ${props => props.$opened ? theme.colors.white : theme.colors.primary};
  transition: all 400ms;
    cursor: pointer;
  &:hover div{
    display: block;
  }
  &:hover{
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};
  }
    span {
      position: absolute;
      top: -10px;
      right: -10px;
      height: 33px;
      width: 33px;
      border-radius: ${theme.borderRadius.circle};
      background-color: ${theme.colors.primary};
      font-size: ${theme.fonts.size.P0};
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `

const CartHeader = styled.div`
  user-select: none;
  background: ${theme.colors.background_dark};
  font-family: 'Pacifico', 'sans-serif';
  color: ${theme.colors.primary};
  font-size: ${theme.fonts.size.P3};
  height: 8%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 50%;
`

const CartContent = styled.div`
  box-shadow: ${props => props.$opened && 'theme.shadows.frame'};
  background: ${theme.colors.background_white};
  height: 92%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 400ms;
`

const List = styled.div`
  height: 100%;
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  gap: 15px;
  overflow: scroll;
  padding-top: 15px;
  padding-bottom: 15px;
`