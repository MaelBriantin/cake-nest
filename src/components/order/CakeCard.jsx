import styled from "styled-components";
import {theme} from "../../theme/index.js";
import {Button} from "../global/Button.jsx";
import {formatPrice} from "../../utils/maths.js"
import {TiDelete} from "react-icons/ti";
import {useContext} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";

export const CakeCard = (props) => {
    const {adminMode, setSelectedTab, setOpenedPanel} = useContext(AdminContext)
    const {store, setStore, selectedItem, setSelectedItem, setIsAdd, deleteCake} = useContext(StoreContext)
    const {cart, setCart} = useContext(CartContext)
    const {image, title, price, id} = props

    const isSelected = selectedItem.id === id
    const isAvailable = store.find(i => i.id === id).isAvailable
    // console.log(isAvailable)
    const handleAdminClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (adminMode) {
            setSelectedTab('edit')
            setOpenedPanel(false)
            setSelectedItem(store.find(i => i.id === id))
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const storeCopy = [...store]
        const newStore = storeCopy.filter(item => item.id !== id)
        setStore(newStore)
        if(selectedItem.id === id) {
            setSelectedItem({})
        }
        // const cartCopy = [...cart]
        // setCart(cartCopy.filter(i => i.id !== id))
        deleteCake(id)
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
                quantity: 1,
                addedAt: Date.now(),
                animate: true
            }
            setCart([newItem, ...cart])
            setIsAdd(newItem)
        }
    }

    return (
        <CardContainer $adminMode={adminMode}  >
            <Card $isAvailable={isAvailable} $adminMode={adminMode} $isSelected={isSelected} onClick={(e) => handleAdminClick(e)} >
                <RemoveButton $isSelected={isSelected}>{adminMode && <TiDelete className={'tiDelete'} onClick={(e) => handleDelete(e)} />}</RemoveButton>
                <CardImage  ><img src={image} alt={''}/></CardImage>
                <BottomCard $adminMode={adminMode}>
                    <CardTitle >{title}</CardTitle>
                    <CardSubTitle $isSelected={isSelected} $adminMode={adminMode} $isAvailable={isAvailable}>
                        <p>{formatPrice(price)}</p>
                        {
                            isAvailable && (<Button adminMode={adminMode} isSelected={isSelected} style={'primary'} size={'small'} value={'Ajouter'} onClick={(e) => addToCart({title, imageSource: image, id, price}, e)}></Button>)
                        }
                        {
                            !isAvailable && (<Button adminMode={adminMode} isSelected={isSelected} style={'disable'} size={'small'} value={'En rupture'}></Button>)
                        }
                    </CardSubTitle>
                </BottomCard>
            </Card>
            {/*<Button adminMode={adminMode} isSelected={isSelected} style={'primary'} size={'small'} value={'Ajouter'} onClick={(e) => addToCart({title, imageSource: image, id, price}, e)}></Button>*/}
        </CardContainer>
    )
}

const CardContainer = styled.div`
  transition: all 400ms;
  &:hover{
    ${props => props.$adminMode && 'transform: scale(1.1)'};
    ${props => props.$adminMode && 'cursor: pointer'};
  }
`

const RemoveButton = styled.div`
  font-size: ${theme.fonts.size.P4};
  color: ${props => props.$isSelected ? theme.colors.white : theme.colors.primary};
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 10px;
  transition: all 200ms;
  .tiDelete{
    cursor: pointer;
    transition: all 200ms;
    z-index: 2;
  }
  .tiDelete:hover{
    color: ${theme.colors.red};
  }
`

const Card = styled.div`
  user-select: none;
  align-items: center;
  border-radius: ${theme.borderRadius.extraRound};
  padding: 10px;
    height: 300px;
    width: 200px;
    background: ${props => props.$isSelected && props.$adminMode ? theme.colors.primary : theme.colors.background_white};
    opacity: ${props => props.$isAvailable ? '1' : '0.3'};
    box-shadow: ${theme.shadows.card};
  
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
    ${props => !props.$isAvailable && 'text-decoration-line: line-through'};
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