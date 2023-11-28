import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {MdDeleteForever} from "react-icons/md";
import {formatPrice} from "../../utils/maths.js";
import {useContext} from "react";
import {CartContext} from "../../context/CartContext.jsx";
import defaultImage from "../../../public/images/cupcake-item.png"

export const CartCard = (props) => {
    const {cart, setCart} = useContext(CartContext)
    const {item} = props;
    const {imageSource, title, price, cartQuantity, id} = item;
    const deleteFromCart = () => {
        const cartCopy = [...cart]
        setCart(cartCopy.filter(i => i.id !== id))
    }
    return (
        <CartCardStyle>
            <CartCardImage>
                <img src={imageSource || defaultImage} alt={''} />
            </CartCardImage>
            <TitlePrice>
                <h1>{title}</h1>
                <p>{formatPrice(price * cartQuantity)}</p>
            </TitlePrice>
            <QuantityDelete onClick={deleteFromCart}>
                <p>x {cartQuantity}</p>
                <div >
                    <MdDeleteForever/>
                </div>
            </QuantityDelete>
        </CartCardStyle>
    )
}

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
  user-select: none;
  width: 90%;
  height: 80px;
  background: ${theme.colors.background_white};
  box-shadow: ${theme.shadows.card};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 400ms;
  //padding: 5px;
  //gap: 15px;
  &:hover{
    transform: scale(1.05);
  }
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
  p{
    height: 20%;
    color: ${theme.colors.primary};
    font-family: 'Open Sans', 'sans-serif';
  }
`

const QuantityDelete = styled.div`
  width: 20%;
  //min-height: 60px;
  //max-height: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 ${theme.borderRadius.round} ${theme.borderRadius.round} 0;
  transition: color 200ms;
  cursor: pointer;
  &:hover{
    background: ${theme.colors.redSecondary};
  }
  &:hover p{
    display: none;
  }
  p{
    font-family: 'Open Sans', 'sans-serif';
    font-size: ${theme.fonts.size.P1};
    color: ${theme.colors.primary};
  }
  &:hover div{
    display: block;
  }
  div{
    display: none;
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P3};
  }
`