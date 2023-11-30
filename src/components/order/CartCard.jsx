import {styled, keyframes} from "styled-components";
import {theme} from "../../theme/index.js";
import {MdDeleteForever} from "react-icons/md";
import {formatPrice} from "../../utils/maths.js";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext.jsx";
import defaultImage from "../../../public/images/cupcake-item.png"
import {StoreContext} from "../../context/StoreContext.jsx";
import {AdminContext} from "../../context/AdminContext.jsx";

export const CartCard = (props) => {
    const {cart, setCart} = useContext(CartContext)
    const {adminMode, setSelectedTab, setOpenedPanel} = useContext(AdminContext)
    const {isAdd, setIsAdd} = useContext(StoreContext)
    const [removed, setRemoved] = useState(false)
    const {item} = props;
    const {imageSource, title, price, cartQuantity, id} = item;
    const {selectedItem, setSelectedItem, store} = useContext(StoreContext)
    const deleteFromCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setRemoved(true)
        setTimeout(() => {
            const cartCopy = [...cart]
            setCart(cartCopy.filter(i => i.id !== id))
        }, 350)
    }
    const selectElement = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (adminMode) {
            setSelectedTab('edit')
            setOpenedPanel(false)
            setSelectedItem(store.find(i => i.id === id))
        }
    }
    const isAvailable = store.find(i => i.id === id).isAvailable
    const isSelected = selectedItem.id === id && adminMode
    return (
        <CartCardStyle $removed={removed} $isSelected={isSelected} $admin={adminMode} onClick={(e) => selectElement(e)}>
            <CartCardImage>
                <img src={imageSource || defaultImage} alt={''} />
            </CartCardImage>
            <TitlePrice $isSelected={isSelected}>
                <h1>{title}</h1>
                { isAvailable && (<p className={'price'}>{formatPrice(price * cartQuantity)}</p>) }
                { !isAvailable && (<p className={'price'}>Non disponible</p>) }
            </TitlePrice>
            <QuantityDelete onClick={deleteFromCart} className={'qtyDelete'}  $isSelected={isSelected}>
                x {cartQuantity}
            </QuantityDelete>
            <DeleteBtn onClick={deleteFromCart} className={'delete'}>
                <MdDeleteForever/>
            </DeleteBtn>
        </CartCardStyle>
    )
}


const AddKeyframe = keyframes`
  0% { transform: translateX(100%); opacity: 0 }
  50% { opacity: 0.25 }
  75% { opacity: 0.5 }
  100% { transform: translateX(0) ; opacity: 1 }
`

const DeleteKeyframe = keyframes`
  0% { transform: translateX(0%); opacity: 1 }
  50% { opacity: 0 }
  100% { transform: translateX(-100%) ; opacity: 0 }
`

const CartCardImage = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  img{
    height: 90%;
  }
`

const CartCardStyle = styled.div`
  position: relative;
  overflow: hidden;
  user-select: none;
  width: 90%;
  min-height: 80px;
  max-height: 80px;
  background: ${props => props.$isSelected ? theme.colors.primary : theme.colors.white};
  box-shadow: ${theme.shadows.card};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 200ms;
  ${props => props.$admin && 'cursor: pointer'};
  &:hover{
    transform: scale(1.05);
  }
  &:hover .delete{
    transform: translateX(0);
  }
  animation: 400ms ${props => props.$removed ? DeleteKeyframe : AddKeyframe} linear;
`

const TitlePrice = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    height: 40%;
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.background_dark};
  }
  .price{
    color: ${props => props.$isSelected ? theme.colors.white : theme.colors.primary};
    height: 20%;
    font-family: 'Open Sans', 'sans-serif';
  }
`

const QuantityDelete = styled.div`
  cursor: pointer;
  width: 25%;
  font-family: 'Open Sans', 'sans-serif';
  font-size: ${theme.fonts.size.P1};
  color: ${props => props.$isSelected ? theme.colors.white : theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 400ms;
  transform: translateX(0);
`
const DeleteBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transition: all 200ms;
  cursor: pointer;
  color: ${theme.colors.white};
  font-size: ${theme.fonts.size.P3};
  background: ${theme.colors.red};
  height: 100%;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(200%);
`
