import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Button} from "../global/Button.jsx";
import {formatPrice} from "../../utils/maths.js"
import {TiDelete} from "react-icons/ti";
import {useContext, useEffect, useState} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";

export const CakeCard = (props) => {
    const {adminMode, setSelectedTab, setOpenedPanel} = useContext(AdminContext)
    const {store, setStore, selectedItem, setSelectedItem, resetSelectedItem} = useContext(StoreContext)
    const {cart, setCart} = useContext(CartContext)
    const {image, title, price, id} = props
    const [addFunctionOn, setAddFunctionOn] = useState(false)

    const isSelected = selectedItem.id === id
    const handleAdminClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (adminMode) {
            setSelectedTab('edit')
            setOpenedPanel(false)
            setSelectedItem(store.find(i => i.id === id))
        }
    }

    const handleDelete = () => {
        const storeCopy = [...store]
        const newStore = storeCopy.filter(item => item.id !== id)
        setStore(newStore)
        if(selectedItem.id === id) {
            setSelectedItem({})
        }
        const cartCopy = [...cart]
        setCart(cartCopy.filter(i => i.id !== id))
    }
    const addToCart = (item, e) => {
        e.stopPropagation();
        e.preventDefault();
        if (cart.some(i => i.id === item.id)) {
            const cartCopy = [...cart]
            cartCopy.map(i => {
                if(i.id === item.id){
                    i.quantity += 1
                }
            })
            setCart(cartCopy)
        } else {
            const newItem = {
                id: item.id,
                quantity: 1
            }
            setCart([newItem, ...cart])
        }
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        <CardContainer $adminMode={adminMode}>
            {adminMode && <RemoveButton $isSelected={isSelected} onClick={() => handleDelete(event)}><TiDelete/></RemoveButton>}
            <Card $adminMode={adminMode} $isSelected={isSelected} onClick={() => handleAdminClick(event)} >
                <CardImage  ><img src={image} alt={''}/></CardImage>
                <BottomCard $adminMode={adminMode}>
                    <CardTitle >{title}</CardTitle>
                    <CardSubTitle $isSelected={isSelected} $adminMode={adminMode}>
                        <p>{formatPrice(price)}</p>
                        <Button adminMode={adminMode} isSelected={isSelected} style={'primary'} size={'small'} value={'Ajouter'} onClick={() => addToCart({title, imageSource: image, id, price}, event)}></Button>
                    </CardSubTitle>
                </BottomCard>
            </Card>
            {/*<Button adminMode={adminMode} isSelected={isSelected} style={'primary'} size={'small'} value={'Ajouter'} onClick={() => addToCart({title, imageSource: image, id, price}, event)}></Button>*/}
        </CardContainer>
    )
}
const CardStyle = styled.div`
  
`
const CardContainer = styled.div`
    position: relative;
  transition: all 400ms;
  &:hover{
    ${props => props.$adminMode && 'transform: scale(1.1)'};
    ${props => props.$adminMode && 'cursor: pointer'};
  }
`

const RemoveButton = styled.div`
  font-size: ${theme.fonts.size.P4};
  color: ${props => props.$isSelected ? theme.colors.white : theme.colors.primary};
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  width: fit-content;
  transition: all 200ms;
  z-index: 2;
  &:hover {
    color: ${theme.colors.redSecondary};
  }
`

const Card = styled.div`
  user-select: none;
  //position: relative;
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound};
  padding: 10px;
    height: 300px;
    width: 200px;
    background: ${props => props.$isSelected && props.$adminMode ? theme.colors.primary : theme.colors.background_white};
    box-shadow: ${theme.shadows.card};
  // transition: all 400ms;
  // &:hover{
  //   ${props => props.$adminMode && 'transform: scale(1.1)'};
  //   ${props => props.$adminMode && 'cursor: pointer'};
  // }
`

const CardImage = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    height: 100%;
    transition: all 600ms;
  }
  img:hover{
    //transform: scale(1.1);
  }
`

const CardTitle = styled.div`
  //background: ${theme.colors.background_white};
  width: 100%;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: 'Pacifico', 'sans-serif';
  font-size: ${theme.fonts.size.P3};
`

const CardSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
    font-family: 'Open Sans', 'sans-serif';
    color: ${props => props.$isSelected && props.$adminMode ? theme.colors.white : theme.colors.primary};
    font-weight: ${theme.fonts.weights.regular};
  p{
    margin-top: 8px;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const BottomCard = styled.div`
  //background: ${theme.colors.background_white};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`